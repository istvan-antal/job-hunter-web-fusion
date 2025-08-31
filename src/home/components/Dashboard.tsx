import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { memo, useEffect, useMemo, useState } from 'react';
import type { Job } from '../../../../job-hunter/entities/Job';
import useJobs from '../hooks/useJobs';
import JobCard from './JobCard';

type MatchType = 'match' | 'partial' | 'no-match';

const toMatchType = (job: Job): MatchType => {
    if (job.suggestApply) {
        return 'match';
    } else if (job.shouldApply) {
        return 'partial';
    }

    return 'no-match';
};

const Dashboard = memo(() => {
    const [tab, setTab] = useState<MatchType>('match');

    const { error, data, loading, reload } = useJobs({
        params: [
            {
                hidden: false,
            },
        ],
        pollInterval: 10_000,
    });

    const matchCountsByType = useMemo(() => {
        return (data ?? []).reduce((result, job) => {
            const matchType = toMatchType(job);
            result[matchType] = (result[matchType] || 0) + 1;
            return result;
        }, {} as Record<MatchType, number>);
    }, [data]);

    useEffect(() => {
        if (data?.length) {
            if (matchCountsByType[tab] === 0) {
                setTab(toMatchType(data[0]));
            }
        }
    }, [data, matchCountsByType, tab]);

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
                <Tab value="match" label={`Matches (${matchCountsByType.match || 0})`} />
                <Tab value="partial" label={`Partial Matches (${matchCountsByType.partial || 0})`} />
                <Tab value="no-match" label={`Non matches (${matchCountsByType['no-match'] || 0})`} />
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
                {data
                    .filter((job) => toMatchType(job) === tab)
                    .map((job) => (
                        <JobCard key={job.id.toString()} job={job} onRemove={onRemove} />
                    ))}
            </Box>
        </Box>
    );
});

export default Dashboard;
