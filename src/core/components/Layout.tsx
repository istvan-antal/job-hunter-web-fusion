import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { memo, type ReactNode } from 'react';
import Link from './Link';

const Layout = memo(({ children }: { children: ReactNode }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="regular" sx={{ gap: 2 }}>
                    <Link to="/" sx={{ textDecoration: 'none' }}>
                        <Typography variant="h6" component="div">
                            Job Hunter
                        </Typography>
                    </Link>
                    <Link to="/preferences" sx={{ textDecoration: 'none' }}>
                        Preferences
                    </Link>
                    <Link to="/stats" sx={{ textDecoration: 'none' }}>
                        Stats
                    </Link>
                    <Box sx={{ flexGrow: 1 }}></Box>
                </Toolbar>
            </AppBar>
            <Box
                display="flex"
                flexDirection="column"
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    flexGrow={1}
                    sx={{ pt: 2, pb: 2, ml: 2, mr: 2, minHeight: '100vh' }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
});

export default Layout;
