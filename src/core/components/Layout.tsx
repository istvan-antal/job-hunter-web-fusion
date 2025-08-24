import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { memo, type ReactNode } from 'react';
import Link from './Link';

const Layout = memo(({ children }: { children: ReactNode }) => {
    return (
        <Box sx={{ flexGrow: 1, backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
            <AppBar 
                position="static" 
                sx={{ 
                    backgroundColor: '#1a1a1a',
                    borderBottom: '1px solid #333',
                }}
            >
                <Toolbar variant="regular" sx={{ gap: 3, px: 3 }}>
                    <Link to="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                backgroundColor: '#ff1744',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        >
                            J
                        </Box>
                        <Typography 
                            variant="h6" 
                            component="div" 
                            sx={{ 
                                color: 'white', 
                                fontWeight: 'bold',
                                letterSpacing: '0.1em',
                            }}
                        >
                            JOB HUNTER
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Link 
                        to="/search" 
                        sx={{ 
                            textDecoration: 'none',
                            color: 'white',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            '&:hover': {
                                color: '#ff1744',
                            },
                        }}
                    >
                        Search
                    </Link>
                    <Link 
                        to="/preferences" 
                        sx={{ 
                            textDecoration: 'none',
                            color: 'white',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            '&:hover': {
                                color: '#ff1744',
                            },
                        }}
                    >
                        Preferences
                    </Link>
                    <Link 
                        to="/stats" 
                        sx={{ 
                            textDecoration: 'none',
                            color: 'white',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            '&:hover': {
                                color: '#ff1744',
                            },
                        }}
                    >
                        Stats
                    </Link>
                </Toolbar>
            </AppBar>
            <Box
                display="flex"
                flexDirection="column"
                component="main"
                sx={{
                    backgroundColor: '#0a0a0a',
                    flexGrow: 1,
                    minHeight: 'calc(100vh - 64px)',
                }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    flexGrow={1}
                    sx={{ pt: 3, pb: 3, px: 3, position: 'relative' }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
});

export default Layout;
