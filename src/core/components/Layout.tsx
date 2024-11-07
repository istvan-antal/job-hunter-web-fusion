import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { type ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="regular" sx={{ gap: 2 }}>
                    <Typography variant="h6" component="div">
                        Job Hunter
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}></Box>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                }}
            >
                <Box sx={{ pt: 2, pb: 2, ml: 2, mr: 2, minHeight: '100vh' }}>{children}</Box>
            </Box>
        </Box>
    );
};

export default Layout;
