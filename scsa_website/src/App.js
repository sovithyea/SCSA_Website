// React hooks
import { useEffect, useMemo, useState } from 'react';

// Router
import { Routes, Route, Link } from 'react-router-dom';

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
    // toggles between light and dark
    const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

    // header styles based on mode
    const headerStyle =
        mode === 'light'
            ? {
                backgroundColor: '#253c97', // Blue for light mode
                color: '#ffffff',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)', // shadow for light mode
            }
            : {
                backgroundColor: '#253c97', // Blue for dark mode
                color: '#ffffff',
                borderBottom: '1px solid rgba(255, 255, 255, 0.3)', // white line for dark mode
            };

    return (
        <>
            <AppBar position="fixed" elevation={0} sx={headerStyle}>
                <Toolbar sx={{ gap: 2 }}>
                    {/* Replace text with logo image */}
                    <img src="/scsa_banner.png" alt="SCSA Logo" style={{ height: '50px' }} />
                    <Box sx={{ flex: 1 }} />
                    <Button component={Link} to="/" sx={{ color: 'inherit' }}>Home</Button>
                    <Button component={Link} to="/aboutus" sx={{ color: 'inherit' }}>About Us</Button>
                    <Button component={Link} to="/events" sx={{ color: 'inherit' }}>Events</Button>
                    <IconButton aria-label="toggle dark mode" onClick={toggleMode} sx={{ ml: 1, color: 'inherit' }}>
                        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* spacer */}
            <Toolbar />
        </>
    );
}
// Home page
function HomePage() {
    usePageTitle('Home | SCSA'); // updates tab title
    return (
        <Container maxWidth={false} disableGutters>
            <Box className="hero" id="home">
                <Typography className="hero-welcome" variant="subtitle2" align="center">
                    Welcome to
                </Typography>

                <div className="hero-title">
                    <span>SCSA SWINBURNE</span>
                </div>

                <div className="hero-photo">
                    <img src="/group.jpg" alt="SCSA Committee group" />
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
