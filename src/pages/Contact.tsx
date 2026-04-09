import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { personalInfo } from '../data/profile';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

interface Social {
  label: string;
  icon: React.ReactElement;
  href: string;
  desc: string;
}

const socials: Social[] = [
  {
    label: 'Email',
    icon: <EmailIcon />,
    href: `mailto:${personalInfo.email}`,
    desc: personalInfo.email,
  },
  {
    label: 'GitHub',
    icon: <GitHubIcon />,
    href: personalInfo.github,
    desc: 'github.com/johann017',
  },
  {
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
    href: personalInfo.linkedin,
    desc: 'Connect with me',
  },
];

function Contact(): React.ReactElement {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      sx={{
        minHeight: '100vh',
        pt: 14,
        pb: 12,
        display: 'flex',
        alignItems: 'center',
        background:
          'radial-gradient(ellipse at 50% 90%, rgba(110,231,183,0.06) 0%, transparent 60%), #0d0d10',
      }}
    >
      <Container maxWidth="sm">
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
              Get In Touch
            </Typography>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Typography
              variant="h2"
              sx={{
                mt: 0.5,
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.8rem' },
                fontFamily: '"Space Grotesk", sans-serif',
                background: 'linear-gradient(135deg, #e8e8f0 30%, #6ee7b7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Let's connect
            </Typography>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 6, lineHeight: 1.8, fontSize: '1.02rem' }}
            >
              Open to new opportunities, collaborations, or just a friendly chat. Reach out
              through any channel below.
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {socials.map((social) => (
              <motion.div
                key={social.label}
                variants={fadeUp}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.25 }}
              >
                <Paper
                  component="a"
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2.5,
                    bgcolor: 'background.paper',
                    border: '1px solid rgba(110, 231, 183, 0.08)',
                    textDecoration: 'none',
                    color: 'text.primary',
                    '&:hover': {
                      borderColor: 'rgba(110, 231, 183, 0.3)',
                      bgcolor: 'rgba(110, 231, 183, 0.02)',
                    },
                    transition: 'all 0.25s ease',
                    borderRadius: 2,
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      bgcolor: 'rgba(110, 231, 183, 0.1)',
                      borderRadius: 1.5,
                      color: 'primary.main',
                      display: 'flex',
                      flexShrink: 0,
                    }}
                  >
                    {social.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={600} sx={{ mb: 0.25 }}>
                      {social.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {social.desc}
                    </Typography>
                  </Box>
                  <ArrowOutwardIcon
                    sx={{ color: 'text.secondary', opacity: 0.4, fontSize: '1.1rem' }}
                  />
                </Paper>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Contact;
