import React, { useState } from 'react';
import {
  Box,
  Chip,
  Container,
  Divider,
  Skeleton,
  Typography,
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import LinkIcon from '@mui/icons-material/Link';
import StarIcon from '@mui/icons-material/Star';
import { motion, AnimatePresence } from 'framer-motion';
import { Timestamp } from 'firebase/firestore';
import { useNewsEvents, NewsEvent } from '../hooks/useNewsEvents';

// ─── Animation variants ───────────────────────────────────────────────────────

const pageVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTimestamp(ts: Timestamp): string {
  const date = ts.toDate();
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function scoreBadgeColor(score: number): string {
  if (score >= 0.75) return '#6ee7b7';
  if (score >= 0.5) return '#fbbf24';
  return '#818cf8';
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function NewsCard({ event }: { event: NewsEvent }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div variants={cardVariants}>
      <Box
        onClick={() => setExpanded((v) => !v)}
        sx={{
          bgcolor: 'background.paper',
          border: event.is_top_event
            ? '1px solid rgba(110, 231, 183, 0.35)'
            : '1px solid rgba(255,255,255,0.06)',
          borderRadius: 3,
          p: { xs: 2.5, md: 3.5 },
          cursor: 'pointer',
          transition: 'border-color 0.25s, box-shadow 0.25s, transform 0.25s',
          '&:hover': {
            borderColor: 'rgba(110, 231, 183, 0.4)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        {/* Top row: badges + score */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 1.5, flexWrap: 'wrap' }}>
          {event.is_top_event && (
            <Chip
              icon={<StarIcon sx={{ fontSize: '0.75rem !important', color: '#6ee7b7 !important' }} />}
              label="Top Event"
              size="small"
              sx={{
                bgcolor: 'rgba(110, 231, 183, 0.1)',
                color: 'primary.main',
                fontWeight: 700,
                fontSize: '0.68rem',
                height: 22,
                border: '1px solid rgba(110, 231, 183, 0.25)',
              }}
            />
          )}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5, px: 1.25, py: 0.25, borderRadius: 1.5, bgcolor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: scoreBadgeColor(event.score), flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', fontWeight: 500 }}>
              {(event.score * 100).toFixed(0)}% relevance
            </Typography>
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, lineHeight: 1.35, mb: 1, fontSize: { xs: '1rem', md: '1.1rem' } }}
        >
          {event.representative_title}
        </Typography>

        {/* Geo tags */}
        {event.geo_tags?.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5, alignItems: 'center' }}>
            <PublicIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} />
            {event.geo_tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: 'rgba(129, 140, 248, 0.08)',
                  color: 'secondary.main',
                  fontSize: '0.68rem',
                  height: 20,
                  fontWeight: 500,
                }}
              />
            ))}
          </Box>
        )}

        {/* Summary */}
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: expanded ? 2 : 0 }}>
          {event.summary}
        </Typography>

        {/* Expanded: key points + sources */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              {event.key_points?.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'primary.main',
                      mb: 1,
                    }}
                  >
                    Key Points
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    {event.key_points.map((point, i) => (
                      <Box
                        key={i}
                        component="li"
                        sx={{ color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.7, mb: 0.5 }}
                      >
                        {point}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              {event.sources?.length > 0 && (
                <Box>
                  <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 1.5 }} />
                  <Typography
                    sx={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'text.secondary',
                      mb: 1,
                    }}
                  >
                    Sources
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {event.sources.map((url, i) => (
                      <Box
                        key={i}
                        component="a"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          px: 1.25,
                          py: 0.4,
                          borderRadius: 1.5,
                          bgcolor: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          textDecoration: 'none',
                          color: 'text.secondary',
                          fontSize: '0.75rem',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: 'rgba(110, 231, 183, 0.07)',
                            borderColor: 'rgba(110, 231, 183, 0.3)',
                            color: 'primary.main',
                          },
                        }}
                      >
                        <LinkIcon sx={{ fontSize: '0.8rem' }} />
                        {hostnameOf(url)}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography sx={{ fontSize: '0.72rem', color: 'rgba(136,136,168,0.6)' }}>
            {formatTimestamp(event.created_at)}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography sx={{ fontSize: '0.72rem', color: 'rgba(136,136,168,0.4)' }}>
            {expanded ? 'Collapse' : 'Expand'}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function NewsCardSkeleton() {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 3,
        p: { xs: 2.5, md: 3.5 },
      }}
    >
      <Skeleton variant="text" width="55%" height={28} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="90%" sx={{ mb: 0.5 }} />
      <Skeleton variant="text" width="75%" />
    </Box>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function News(): React.ReactElement {
  const { events, loading, error } = useNewsEvents();

  return (
    <Box
      component={motion.div}
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      sx={{
        minHeight: '100vh',
        pt: 14,
        pb: 12,
        background:
          'radial-gradient(ellipse at 80% 0%, rgba(129,140,248,0.06) 0%, transparent 50%), #0d0d10',
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 7 }}>
          <Typography
            sx={{
              color: 'primary.main',
              letterSpacing: '0.22em',
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            Live Feed
          </Typography>
          <Typography variant="h2" sx={{ mt: 0.5, mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}>
            News{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              Briefings
            </Box>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                bgcolor: '#6ee7b7',
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                  '50%': { opacity: 0.5, transform: 'scale(0.75)' },
                },
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Real-time &mdash; updates automatically every ~15 min
            </Typography>
          </Box>
        </Box>

        {/* Error */}
        {error && (
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              mb: 4,
            }}
          >
            <Typography color="error" variant="body2">{error}</Typography>
          </Box>
        )}

        {/* Skeletons */}
        {loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[...Array(5)].map((_, i) => <NewsCardSkeleton key={i} />)}
          </Box>
        )}

        {/* Empty */}
        {!loading && !error && events.length === 0 && (
          <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 10 }}>
            No news events found.
          </Typography>
        )}

        {/* Cards */}
        {!loading && events.length > 0 && (
          <motion.div variants={listVariants} initial="hidden" animate="show">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {events.map((event) => (
                <NewsCard key={event.id} event={event} />
              ))}
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}

export default News;
