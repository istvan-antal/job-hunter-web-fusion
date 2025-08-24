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
                    borderBottom: '4px solid #ff1744',
                    borderRadius: 0,
                }}
            >
                <Toolbar variant="regular" sx={{ gap: 3, px: 3 }}>
                    <Link to="/" sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 32,
                                height: 32,
                                borderRadius: 0,
                                backgroundColor: '#ff1744',
                                border: '2px solid #000',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 900,
                            }}
                        >
                            J
                        </Box>
                        <Typography 
                            variant="h6" 
                            component="div" 
                            sx={{ 
                                color: 'white', 
                                fontWeight: 900,
                                letterSpacing: '0.2em',
                                textShadow: '2px 2px 0px #000',
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
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            border: '2px solid transparent',
                            px: 2,
                            py: 1,
                            '&:hover': {
                                color: '#ff1744',
                                borderColor: '#ff1744',
                                textShadow: '2px 2px 0px #000',
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
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            border: '2px solid transparent',
                            px: 2,
                            py: 1,
                            '&:hover': {
                                color: '#ff1744',
                                borderColor: '#ff1744',
                                textShadow: '2px 2px 0px #000',
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
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            border: '2px solid transparent',
                            px: 2,
                            py: 1,
                            '&:hover': {
                                color: '#ff1744',
                                borderColor: '#ff1744',
                                textShadow: '2px 2px 0px #000',
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
