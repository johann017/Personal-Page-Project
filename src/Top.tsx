import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavLink {
  label: string;
  path: string;
}

const navLinks: NavLink[] = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Resume', path: '/resume' },
  { label: 'Contact', path: '/contact' },
];

function Navbar(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled ? 'rgba(13, 13, 16, 0.82)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(110, 231, 183, 0.1)' : 'none',
          transition: 'background 0.35s ease, border-bottom 0.35s ease, backdrop-filter 0.35s ease',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1.5 }}>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
              <Typography
                component={Link}
                to="/"
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '1.3rem',
                  letterSpacing: '-0.02em',
                }}
              >
                JA
              </Typography>
            </motion.div>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
              {navLinks.map((link) => {
                const active =
                  location.pathname === `/${link.path.slice(1)}` ||
                  (link.path === '/' && location.pathname === '/');
                return (
                  <Button
                    key={link.path}
                    component={Link}
                    to={link.path}
                    sx={{
                      color: active ? 'primary.main' : 'text.secondary',
                      fontSize: '0.9rem',
                      fontWeight: active ? 600 : 400,
                      position: 'relative',
                      px: 2,
                      '&:hover': {
                        color: 'primary.main',
                        bgcolor: 'rgba(110, 231, 183, 0.06)',
                      },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        style={{
                          position: 'absolute',
                          bottom: 4,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          background: '#6ee7b7',
                          display: 'block',
                        }}
                      />
                    )}
                  </Button>
                );
              })}
            </Box>

            {/* Mobile hamburger */}
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
              onClick={() => setMobileOpen(true)}
              aria-label="open menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: '#16161f',
            borderLeft: '1px solid rgba(110, 231, 183, 0.12)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{ color: 'text.secondary' }}
            aria-label="close menu"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 1 }}>
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <ListItem key={link.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    borderRadius: 2,
                    color: active ? 'primary.main' : 'text.primary',
                    fontWeight: active ? 600 : 400,
                    '&:hover': {
                      bgcolor: 'rgba(110, 231, 183, 0.07)',
                      color: 'primary.main',
                    },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{ fontWeight: active ? 600 : 400 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
