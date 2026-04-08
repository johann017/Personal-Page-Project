import React, { useRef } from 'react';
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import WorkIcon from '@mui/icons-material/Work';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { experience, personalInfo, skills, type Skill } from '../data/profile';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

function SectionLabel({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
      <Typography
        sx={{
          color: 'primary.main',
          letterSpacing: '0.2em',
          fontSize: '0.7rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          mb: 1,
        }}
      >
        {children}
      </Typography>
    </motion.div>
  );
}

function SkillBar({ name, level }: Skill): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <Box ref={ref} sx={{ mb: 2.5 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
        <Typography variant="body2" fontWeight={500} sx={{ color: 'text.primary' }}>
          {name}
        </Typography>
        <Typography variant="body2" fontWeight={600} sx={{ color: 'primary.main' }}>
          {level}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={inView ? level : 0}
        sx={{
          height: 5,
          borderRadius: 3,
          bgcolor: 'rgba(110, 231, 183, 0.1)',
          '& .MuiLinearProgress-bar': {
            transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1) !important',
            borderRadius: 3,
            background: 'linear-gradient(90deg, #6ee7b7, #34d399)',
          },
        }}
      />
    </Box>
  );
}

function SkillGroup({
  label,
  category,
  data,
}: {
  label: string;
  category: string;
  data: Skill[];
}): React.ReactElement {
  return (
    <Box>
      <SectionLabel>{label}</SectionLabel>
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          {category}
        </Typography>
      </motion.div>
      {data.map((s) => (
        <SkillBar key={s.name} name={s.name} level={s.level} />
      ))}
    </Box>
  );
}

function AiToolsGroup({ tools }: { tools: string[] }): React.ReactElement {
  return (
    <Box>
      <SectionLabel>AI</SectionLabel>
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          AI Tools
        </Typography>
      </motion.div>
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {tools.map((tool) => (
            <motion.div key={tool} variants={fadeUp}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(110, 231, 183, 0.05)',
                  border: '1px solid rgba(110, 231, 183, 0.1)',
                }}
              >
                <SmartToyIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
                <Typography variant="body2" fontWeight={500} sx={{ color: 'text.primary' }}>
                  {tool}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}

function About(): React.ReactElement {
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
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionLabel>About Me</SectionLabel>
          <motion.div variants={fadeUp}>
            <Typography
              variant="h2"
              sx={{ mt: 0.5, mb: 7, fontSize: { xs: '2rem', md: '3rem' } }}
            >
              Crafting elegant{' '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                solutions
              </Box>
            </Typography>
          </motion.div>
        </motion.div>

        {/* Bio row */}
        <Grid container spacing={6} alignItems="center" sx={{ mb: 10 }}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Avatar
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  sx={{
                    width: { xs: 200, md: 260 },
                    height: { xs: 200, md: 260 },
                    border: '2px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 0 50px rgba(110, 231, 183, 0.18)',
                  }}
                />
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={8}>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {personalInfo.bio.map((paragraph, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.85,
                      mb: 2,
                      fontSize: '1.05rem',
                    }}
                  >
                    {paragraph}
                  </Typography>
                </motion.div>
              ))}
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(110, 231, 183, 0.1)', mb: 9 }} />

        {/* Experience */}
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionLabel>Work History</SectionLabel>
          <motion.div variants={fadeUp}>
            <Typography variant="h4" sx={{ mt: 0.5, mb: 4 }}>
              Where I've worked
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 10 }}>
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.25 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    flexWrap: 'wrap',
                    bgcolor: 'background.paper',
                    border: '1px solid rgba(110, 231, 183, 0.08)',
                    '&:hover': { borderColor: 'rgba(110, 231, 183, 0.25)' },
                    transition: 'border-color 0.25s ease',
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      p: 1.25,
                      bgcolor: 'rgba(110, 231, 183, 0.08)',
                      borderRadius: 1.5,
                      color: 'primary.main',
                      display: 'flex',
                      flexShrink: 0,
                    }}
                  >
                    <WorkIcon />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {exp.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {exp.company}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', mt: 1 }}>
                      {exp.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(110, 231, 183, 0.07)',
                            color: 'text.secondary',
                            fontSize: '0.7rem',
                            height: 22,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Chip
                    label={exp.period}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(110, 231, 183, 0.1)',
                      color: 'primary.main',
                      fontWeight: 500,
                      borderRadius: 1,
                      flexShrink: 0,
                    }}
                  />
                </Paper>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        <Divider sx={{ borderColor: 'rgba(110, 231, 183, 0.1)', mb: 9 }} />

        {/* Skills */}
        <Grid container spacing={6}>
          <Grid item xs={12} md={3}>
            <SkillGroup label="Languages" category="Programming" data={skills.programming} />
          </Grid>
          <Grid item xs={12} md={3}>
            <SkillGroup label="Cloud" category="Technologies" data={skills.technologies} />
          </Grid>
          <Grid item xs={12} md={3}>
            <SkillGroup label="Interpersonal" category="Soft Skills" data={skills.soft} />
          </Grid>
          <Grid item xs={12} md={3}>
            <AiToolsGroup tools={skills.aiTools} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;
