import useJobs from '../hooks/useJobs';
import JobCard from './JobCard';

function Dashboard() {
    const { error, data, loading, reload } = useJobs({
        params: [],
        pollInterval: 30_000,
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
            {data.map((job) => (
                <JobCard key={job._id.toString()} job={job} onRemove={onRemove} />
            ))}
        </>
    );
}

export default Dashboard;
