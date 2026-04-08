import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { personalInfo } from '../data/profile';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function Home(): React.ReactElement {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background:
          'radial-gradient(ellipse at 15% 55%, rgba(110,231,183,0.07) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(129,140,248,0.06) 0%, transparent 55%), #0d0d10',
      }}
    >
      {/* Decorative ambient blobs */}
      <Box
        sx={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(110,231,183,0.07) 0%, transparent 70%)',
          top: '-200px',
          right: '-250px',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%)',
          bottom: '-150px',
          left: '-150px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <Typography
              sx={{
                color: 'primary.main',
                letterSpacing: '0.22em',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                mb: 1,
              }}
            >
              Portfolio
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2.8rem', sm: '4.2rem', md: '6rem', lg: '7.5rem' },
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
                mb: 3,
                fontFamily: '"Space Grotesk", sans-serif',
                background: 'linear-gradient(135deg, #e8e8f0 25%, #6ee7b7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {personalInfo.name}
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                fontWeight: 400,
                mb: 5,
                maxWidth: 520,
                lineHeight: 1.65,
                fontSize: { xs: '1rem', md: '1.15rem' },
              }}
            >
              {personalInfo.subtitle} &mdash; building elegant software with modern cloud
              architecture.
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/projects"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: 'primary.main',
                  color: '#0d0d10',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(110, 231, 183, 0.3)',
                  },
                  transition: 'all 0.25s ease',
                  fontWeight: 700,
                }}
              >
                View My Work
              </Button>
              <Button
                component={Link}
                to="/contact"
                variant="outlined"
                sx={{
                  borderColor: 'rgba(110, 231, 183, 0.35)',
                  color: 'text.secondary',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    bgcolor: 'rgba(110, 231, 183, 0.05)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.25s ease',
                }}
              >
                Get In Touch
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Home;
