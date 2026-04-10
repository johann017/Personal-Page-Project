import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { newsDb as db } from '../firebase';

const COLLECTION_NAME = 'events';

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

export function useNewsEvents() {
  const [events, setEvents] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('created_at', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as NewsEvent[];
        setEvents(docs);
        setLoading(false);
      },
      (err) => {
        console.error('Firestore onSnapshot error:', err);
        setError('Failed to load news. Please try again later.');
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { events, loading, error };
}
