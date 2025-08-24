import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { memo, useState } from 'react';
import useJobs from '../hooks/useJobs';
import JobCard from './JobCard';


const Dashboard = memo(() => {
    const [tab, setTab] = useState<'all' | 'today'>('all');

    const { error, data, loading, reload } = useJobs({
        params: [
            {
                hidden: false,
                todayOnly: tab === 'today',
            },
        ],
        pollInterval: 10_000,
    });

    if (error) {
        return <>{error.toString()}</>;
    }

    if (loading) {
        return <>Loading...</>;
    }

    const onRemove = () => {
        reload();
    };

    return (
        <Box>

            <Tabs 
                value={tab} 
                onChange={(_e, v) => setTab(v)} 
                sx={{ 
                    mb: 2,
                    borderBottom: '3px solid #333',
                    '& .MuiTab-root': {
                        color: 'white',
                        fontWeight: 900,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        border: '3px solid #333',
                        borderBottom: 'none',
                        borderRadius: 0,
                        backgroundColor: '#1a1a1a',
                        mr: 1,
                        minHeight: 60,
                        '&.Mui-selected': {
                            color: '#000',
                            backgroundColor: '#ff1744',
                            borderColor: '#000',
                            borderBottom: '3px solid #000',
                            textShadow: 'none',
                        },
                        '&:hover': {
                            borderColor: '#ff1744',
                        },
                    },
                    '& .MuiTabs-indicator': {
                        display: 'none',
                    },
                }} 
                aria-label="Jobs tabs"
            >
                <Tab value="all" label="All Jobs" />
                <Tab value="today" label="Today's Jobs" />
            </Tabs>
            
            {!data.length && (
                <Box 
                    sx={{ 
                        textAlign: 'center',
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 900,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        mt: 4,
                        p: 4,
                        border: '4px solid #ff1744',
                        borderRadius: 0,
                        backgroundColor: '#1a1a1a',
                        textShadow: '2px 2px 0px #000',
                    }}
                >
                    No jobs on the market yet.
                </Box>
            )}
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {data.map((job) => (
                    <JobCard key={job.id.toString()} job={job} onRemove={onRemove} />
                ))}
            </Box>
        </Box>
    );
});

export default Dashboard;