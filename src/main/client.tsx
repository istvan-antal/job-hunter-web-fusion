import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import AnalyzeJob from '../analyze/components/AnalyzeJob.tsx';
import Layout from '../core/components/Layout.tsx';
import PreferenceProvider from '../core/components/PreferenceProvider.tsx';
import Dashboard from '../home/components/Dashboard.tsx';
import Preferences from '../preferences/components/Preferences.tsx';
import SearchPage from '../search/components/SearchPage.tsx';
import StatsPage from '../stats/components/StatsPage.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Layout>
                <Outlet />
            </Layout>
        ),
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/search',
                element: <SearchPage />,
            },
            {
                path: '/preferences',
                element: <Preferences />,
            },
            {
                path: '/stats',
                element: <StatsPage />,
            },
            {
                path: '/analyze/:id',
                element: <AnalyzeJob />,
            },
        ],
    },
]);

const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0a0a0a',
            paper: '#1a1a1a',
        },
        primary: {
            main: '#ff1744',
        },
        secondary: {
            main: '#00e676',
        },
        text: {
            primary: '#ffffff',
            secondary: '#cccccc',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 900,
            letterSpacing: '0.02em',
        },
        h2: {
            fontWeight: 800,
            letterSpacing: '0.02em',
        },
        h6: {
            fontWeight: 700,
            letterSpacing: '0.1em',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                },
            },
        },
    },
});

const root = document.getElementById('root');

if (!root) {
    throw new Error('Root not found.');
}

createRoot(root).render(
    <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <PreferenceProvider>
                <RouterProvider router={router} />
            </PreferenceProvider>
        </Box>
    </ThemeProvider>,
);
