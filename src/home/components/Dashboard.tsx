import { memo } from 'react';
import useJobs from '../hooks/useJobs';
import JobCard from './JobCard';

const Dashboard = memo(() => {
    const { error, data, loading, reload } = useJobs({
        params: [],
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

    if (!data.length) {
        return <>No jobs on the market yet.</>;
    }

    return (
        <>
            {data.map((job) => (
                <JobCard key={job.id.toString()} job={job} onRemove={onRemove} />
            ))}
        </>
    );
});

export default Dashboard;
