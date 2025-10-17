// React hooks
import { useEffect, useMemo, useState } from 'react';

// Router
import { Routes, Route, Link, useLocation } from 'react-router-dom';


// MUI components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

// Local styles
import './App.css';

export default function App() {
    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(prefersDark ? 'dark' : 'light');
    const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

    useEffect(() => {
        document.body.dataset.theme = mode;
    }, [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppHeader mode={mode} setMode={setMode} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/aboutus" element={<AboutPage />} />
                <Route path="/events" element={<EventsPage />} />
            </Routes>
        </ThemeProvider>
    );
}

function usePageTitle(title) {
    useEffect(() => {
        document.title = title;
    }, [title]);
}

// header with navigation and dark mode toggle
function AppHeader({ mode, setMode }) {
    // toggle light/dark
    const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

    // current route
    const { pathname } = useLocation();

    // header colors (unchanged)
    const headerStyle =
        mode === 'light'
            ? { backgroundColor: '#253c97', color: '#ffffff', boxShadow: '0px 2px 10px rgba(0,0,0,0.15)' }
            : { backgroundColor: '#253c97', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.3)' };

    // active: light=black, dark=white | inactive: light=white, dark=black
    const navSx = (to) => {
        const active = pathname === to;
        const color = active
            ? (mode === 'light' ? '#000000' : '#FFFFFF')
            : (mode === 'light' ? '#FFFFFF' : '#000000');

        return {
            color,
            fontWeight: active ? 800 : 600,
            opacity: 1,
            px: 1.25,
            borderRadius: 1,
            transition: 'background-color .2s ease, opacity .2s ease',
            '&:hover': {
                backgroundColor: mode === 'light' ? 'rgba(0,0,0,.06)' : 'rgba(255,255,255,.08)',
            },
        };
    };

    return (
        <>
            <AppBar position="fixed" elevation={0} sx={headerStyle}>
                <Toolbar sx={{ minHeight: 80, px: 3 }}>
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: 1200,
                            mx: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 20,
                        }}
                    >
                        {/* make the banner clickable to go home */}
                        <Box component={Link} to="/" aria-label="Go to Home" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                            <img src="/scsa_banner.png" alt="SCSA Logo" style={{ height: 56, display: 'block', cursor: 'pointer' }} />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 'auto' }}>
                            {/* FIXED paths so they match your Routes (/, /aboutus, /events) */}
                            <Button component={Link} to="/" sx={navSx('/')}>Home</Button>
                            <Button component={Link} to="/aboutus" sx={navSx('/aboutus')}>About Us</Button>
                            <Button component={Link} to="/events" sx={navSx('/events')}>Events</Button>

                            <IconButton aria-label="toggle dark mode" onClick={toggleMode} sx={{ ml: 0.5, color: 'inherit' }}>
                                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                            </IconButton>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* spacer equals header height */}
            <Toolbar sx={{ minHeight: 80 }} />
        </>
    );
}

// Home page
function HomePage() {
    usePageTitle('Home | SCSA'); // updates tab title
    return (
        <Container maxWidth={false} disableGutters>
            <Box className="hero" id="home">
                <Typography className="hero-welcome" variant="h3" align="center">
                    WELCOME TO
                </Typography>

                <div className="hero-title">
                    <span>SCSA SWINBURNE</span>
                </div>

                <div className="hero-photo">
                    <img src="/group_pic.png" alt="SCSA Committee group" />
                </div>
            </Box>

            {/* This is the bottom red section */}
            <Box className="bottom-part">
                <Container maxWidth="md" sx={{ py: 6 }}>
                    <Typography
                        variant="h4"
                        sx={{ mb: 2, fontWeight: 900, textAlign: 'center', letterSpacing: '-0.02em' }}
                    >
                        Who Are We?
                    </Typography>
                    <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
                        We’re the Swinburne Cambodian Student Association (SCSA) — building community,
                        culture, and career growth through events, workshops, and hangouts.
                    </Typography>
                </Container>
            </Box>
        </Container>
    );
}

function AboutPage() {
    usePageTitle('About Us | SCSA');
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>About Us</Typography>
            <Typography color="text.secondary">Coming soon…</Typography>
        </Container>
    );
}

function EventsPage() {
    usePageTitle('Events | SCSA');
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Events</Typography>
            <Typography color="text.secondary">Coming soon…</Typography>
        </Container>
    );
}