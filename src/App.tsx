import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AnimatePresence } from 'framer-motion';
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Resume from './pages/Resume';
import News from './pages/News';
import Travels from './pages/Travels';
import { AdminProvider, useAdmin } from './context/AdminContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6ee7b7',
      light: '#a7f3d0',
      dark: '#34d399',
    },
    secondary: {
      main: '#818cf8',
    },
    background: {
      default: '#0d0d10',
      paper: '#16161f',
    },
    text: {
      primary: '#e8e8f0',
      secondary: '#8888a8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
});

function AdminRoute({ children }: { children: React.ReactElement }): React.ReactElement {
  const { isAdmin } = useAdmin();
  return isAdmin ? children : <Navigate to="/" replace />;
}

function AnimatedRoutes(): React.ReactElement {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="resume" element={<Resume />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects/news-briefing" element={<News />} />
          <Route path="travels" element={<AdminRoute><Travels /></AdminRoute>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
