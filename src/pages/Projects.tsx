import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Link } from 'react-router-dom';
import { projects } from '../data/profile';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function Projects(): React.ReactElement {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      sx={{ minHeight: '100vh', pt: 14, pb: 12, background: '#0d0d10' }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
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
              My Work
            </Typography>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Typography
              variant="h2"
              sx={{ mt: 0.5, mb: 2, fontSize: { xs: '2rem', md: '3rem' } }}
            >
              Featured{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                Projects
              </Box>
            </Typography>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 7, maxWidth: 500, lineHeight: 1.75, fontSize: '1.02rem' }}
            >
              A selection of projects that showcase my skills in software engineering, data
              science, and API development.
            </Typography>
          </motion.div>
        </motion.div>

        {/* Live project callout */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Box
            component={Link}
            to="/projects/news-briefing"
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 3,
              mb: 5,
              p: 3,
              borderRadius: 3,
              bgcolor: 'background.paper',
              border: '1px solid rgba(110, 231, 183, 0.22)',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              '&:hover': {
                border: '1px solid rgba(110, 231, 183, 0.5)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.75 }}>
                <FiberManualRecordIcon
                  sx={{
                    fontSize: '0.6rem',
                    color: 'primary.main',
                    animation: 'pulse 2s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.4 },
                    },
                  }}
                />
                <Typography sx={{ fontSize: '0.7rem', color: 'primary.main', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  Live Project
                </Typography>
              </Box>
              <Typography variant="h6" fontWeight={700} color="text.primary" gutterBottom>
                AI News Aggregator
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 1.5 }}>
                A near real-time news briefing engine that clusters and scores global events from multiple
                sources, powered by Firestore and updated automatically every ~15 minutes.
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                {['Python', 'Firestore', 'React', 'TypeScript', 'NLP'].map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{ bgcolor: 'rgba(110, 231, 183, 0.08)', color: 'primary.main', fontSize: '0.7rem', height: 22, fontWeight: 500 }}
                  />
                ))}
              </Box>
            </Box>
            <Button
              variant="outlined"
              endIcon={<OpenInNewIcon sx={{ fontSize: '0.9rem !important' }} />}
              sx={{
                borderColor: 'rgba(110, 231, 183, 0.35)',
                color: 'primary.main',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(110, 231, 183, 0.06)' },
              }}
            >
              View Live
            </Button>
          </Box>
        </motion.div>

        {/* Cards */}
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Grid container spacing={3}>
            {projects.map((project, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <motion.div
                  variants={fadeUp}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'background.paper',
                      border: '1px solid rgba(110, 231, 183, 0.08)',
                      '&:hover': {
                        border: '1px solid rgba(110, 231, 183, 0.28)',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.55)',
                      },
                      transition: 'all 0.3s ease',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Image */}
                    <Box sx={{ overflow: 'hidden', height: 180, bgcolor: 'rgba(0,0,0,0.3)' }}>
                      <CardMedia
                        component="img"
                        image={project.image}
                        alt={project.title}
                        sx={{
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.45s ease',
                          '&:hover': { transform: 'scale(1.06)' },
                        }}
                      />
                    </Box>

                    <CardContent sx={{ flex: 1, p: 3 }}>
                      <Typography variant="h6" fontWeight={700} gutterBottom>
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.75, mb: 2 }}
                      >
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                        {project.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(110, 231, 183, 0.08)',
                              color: 'primary.main',
                              fontSize: '0.7rem',
                              height: 22,
                              fontWeight: 500,
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>

                    <Box sx={{ p: 3, pt: 0, display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<GitHubIcon sx={{ fontSize: '1rem !important' }} />}
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        sx={{
                          borderColor: 'rgba(110, 231, 183, 0.25)',
                          color: 'text.secondary',
                          fontSize: '0.8rem',
                          py: 0.75,
                          '&:hover': {
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            bgcolor: 'rgba(110,231,183,0.05)',
                          },
                        }}
                      >
                        Code
                      </Button>
                      {project.demo && (
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<OpenInNewIcon sx={{ fontSize: '1rem !important' }} />}
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          sx={{
                            borderColor: 'rgba(110, 231, 183, 0.25)',
                            color: 'text.secondary',
                            fontSize: '0.8rem',
                            py: 0.75,
                            '&:hover': {
                              borderColor: 'primary.main',
                              color: 'primary.main',
                              bgcolor: 'rgba(110,231,183,0.05)',
                            },
                          }}
                        >
                          Analysis
                        </Button>
                      )}
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Projects;
