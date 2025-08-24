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
        <>
            <Tabs value={tab} onChange={(_e, v) => setTab(v)} sx={{ mb: 2 }} aria-label="Jobs tabs">
                <Tab value="all" label="All" />
                <Tab value="today" label="Today" />
            </Tabs>
            {!data.length && <>No jobs on the market yet.</>}
            {data.map((job) => (
                <JobCard key={job.id.toString()} job={job} onRemove={onRemove} />
            ))}
        </>
    );
});

export default Dashboard;
