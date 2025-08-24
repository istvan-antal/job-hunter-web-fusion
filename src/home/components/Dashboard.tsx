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
                    '& .MuiTab-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        '&.Mui-selected': {
                            color: '#ff1744',
                        },
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#ff1744',
                        height: 3,
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
                        color: '#ccc',
                        fontSize: '1.2rem',
                        mt: 4,
                        p: 4,
                        border: '2px solid #333',
                        borderRadius: '12px',
                        backgroundColor: '#1a1a1a',
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