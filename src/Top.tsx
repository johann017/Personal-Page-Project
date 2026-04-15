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
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from './context/AdminContext';

interface NavLink {
  label: string;
  path: string;
}

const baseNavLinks: NavLink[] = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Resume', path: '/resume' },
  { label: 'Contact', path: '/contact' },
];

const adminNavLinks: NavLink[] = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Travels', path: '/travels' },
  { label: 'Resume', path: '/resume' },
  { label: 'Contact', path: '/contact' },
];

function Navbar(): React.ReactElement {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const location = useLocation();
  const { isAdmin, toggleAdmin } = useAdmin();
  const navLinks = isAdmin ? adminNavLinks : baseNavLinks;

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

            {/* Avatar — opens dropdown */}
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
              <Box
                onClick={(e) => setMenuAnchor(e.currentTarget)}
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  bgcolor: isAdmin ? 'rgba(129,140,248,0.15)' : 'rgba(110,231,183,0.1)',
                  border: isAdmin
                    ? '1.5px solid rgba(129,140,248,0.5)'
                    : '1.5px solid rgba(110,231,183,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    bgcolor: isAdmin ? 'rgba(129,140,248,0.22)' : 'rgba(110,231,183,0.16)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 800,
                    color: isAdmin ? 'secondary.main' : 'primary.main',
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: '0.8rem',
                    letterSpacing: '-0.01em',
                    lineHeight: 1,
                    userSelect: 'none',
                    transition: 'color 0.25s ease',
                  }}
                >
                  JA
                </Typography>
              </Box>
            </motion.div>

            {/* Avatar dropdown menu */}
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    bgcolor: '#16161f',
                    border: '1px solid rgba(110,231,183,0.12)',
                    borderRadius: 2,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  },
                },
              }}
            >
              {/* Profile row */}
              <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: 'text.primary' }}>
                  Johann Antisseril
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mt: 0.25 }}>
                  Site owner
                </Typography>
              </Box>

              <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.06)', mx: 1, my: 0.5 }} />

              {/* Admin mode toggle */}
              <MenuItem
                onClick={toggleAdmin}
                disableRipple
                sx={{
                  mx: 0.5,
                  borderRadius: 1.5,
                  px: 1.5,
                  py: 0.75,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  '&:hover': { bgcolor: 'rgba(110,231,183,0.06)' },
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 500, color: 'text.primary' }}>
                    Admin mode
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                    In progress
                  </Typography>
                </Box>
                <Switch
                  checked={isAdmin}
                  size="small"
                  onClick={(e) => e.stopPropagation()}
                  onChange={toggleAdmin}
                  sx={{
                    ml: 1,
                    '& .MuiSwitch-switchBase.Mui-checked': { color: 'primary.main' },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                />
              </MenuItem>
            </Menu>

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
