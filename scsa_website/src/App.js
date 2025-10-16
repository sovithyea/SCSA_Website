// React hooks
import { useMemo } from 'react';
import { useState } from 'react';

// Router
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

// Local styles
import './App.css';

export default function App() {
    // Theme setup
    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(prefersDark ? 'dark' : 'light');
    const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

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

// App bar with nav buttons and routing
function AppHeader(props) {
    const mode = props.mode;
    const setMode = props.setMode;
    const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar sx={{ gap: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                    Swinburne Cambodian Student Association (SCSA)
                </Typography>
                <Box sx={{ flex: 1 }} />
                <Button component={Link} to="/">Home</Button>
                <Button component={Link} to="/aboutus">About Us</Button>
                <Button component={Link} to="/events">Events</Button>
                <Button variant="contained" size="small" component={Link} to="/">Sign in</Button>
                <IconButton aria-label="toggle dark mode" onClick={toggleMode} sx={{ ml: 1 }}>
                    {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

// Home page
function HomePage() {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Home Page</Typography>
            <Typography color="text.secondary">Coming soon…</Typography>
        </Container>
    );
}

// About Us Page
function AboutPage() {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>About Us Page</Typography>
            <Typography color="text.secondary">Coming soon…</Typography>
        </Container>
    );
}

// Events Page
function EventsPage() {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Events Section</Typography>
            <Typography color="text.secondary">Coming soon…</Typography>
        </Container>
    );
}


