import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Layout from '../core/components/Layout.tsx';
import Dashboard from '../home/components/Dashboard.tsx';

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
            <RouterProvider router={router} />
        </Box>
    </ThemeProvider>,
);
