import { useCallback, useEffect, useRef, useState } from 'react';
import { collection, doc, getDocs, onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore';
import { newsDb as db } from '../firebase';

const COLLECTION_NAME = 'events';
const META_DOC = doc(db, 'metadata', 'pipeline');
const CACHE_KEY = 'news_events_cache';

export interface NewsEvent {
  id: string;
  cluster_id: string;
  event_id: string;
  representative_title: string;
  summary: string;
  key_points: string[];
  geo_tags: string[];
  sources: string[];
  score: number;
  is_top_event: boolean;
  created_at: Timestamp;
  expires_at: Timestamp;
}

// ─── Cache helpers ────────────────────────────────────────────────────────────

interface CachedData {
  events: NewsEvent[];
  fetchedAt: number;
}

// Firestore Timestamps become plain { seconds, nanoseconds } after JSON round-trip.
function rehydrateTimestamp(raw: { seconds: number; nanoseconds: number }): Timestamp {
  return new Timestamp(raw.seconds, raw.nanoseconds);
}

function loadCache(): CachedData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedData;
    parsed.events = parsed.events.map((e) => ({
      ...e,
      created_at: rehydrateTimestamp(e.created_at as unknown as { seconds: number; nanoseconds: number }),
      expires_at: rehydrateTimestamp(e.expires_at as unknown as { seconds: number; nanoseconds: number }),
    }));
    return parsed;
  } catch {
    return null;
  }
}

function saveCache(events: NewsEvent[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ events, fetchedAt: Date.now() }));
  } catch {
    // Silently ignore — private browsing or storage quota exceeded.
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useNewsEvents() {
  const [events, setEvents] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Tracks the ms timestamp of the last successful fetch so the metadata
  // listener can decide whether the pipeline has produced newer data.
  const lastFetchedAtRef = useRef<number>(0);

  const fetchEvents = useCallback(async () => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('expires_at', '>', Timestamp.now()),
        orderBy('expires_at', 'desc')
      );
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as NewsEvent[];
      lastFetchedAtRef.current = Date.now();
      saveCache(docs);
      setEvents(docs);
      setError(null);
    } catch (err) {
      console.error('Firestore fetch error:', err);
      setError('Failed to load news. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Hydrate from localStorage immediately so the page is never blank on refresh.
    const cached = loadCache();
    if (cached) {
      lastFetchedAtRef.current = cached.fetchedAt;
      setEvents(cached.events);
      setLoading(false);
    }

    // Listen to the single metadata doc the pipeline stamps after each write.
    // Cost: 1 read on mount + 1 read per pipeline run — regardless of how many
    // tabs are open or how often the user refreshes.
    const unsubscribe = onSnapshot(META_DOC, (snap) => {
      const lastUpdated = snap.data()?.last_updated as Timestamp | undefined;

      if (!lastUpdated) {
        // Metadata doc doesn't exist yet — fall back to a one-time fetch if
        // we have nothing cached to show.
        if (!cached) fetchEvents();
        return;
      }

      // Only fetch the events collection when the pipeline has written data
      // more recently than our last fetch.
      if (lastUpdated.toMillis() > lastFetchedAtRef.current) {
        fetchEvents();
      }
    });

    return unsubscribe;
  }, [fetchEvents]);

  return { events, loading, error };
}
