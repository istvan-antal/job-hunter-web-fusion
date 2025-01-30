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
