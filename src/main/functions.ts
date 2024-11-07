import applyToJob from '../home/api/applyToJob';
import dismissJob from '../home/api/dismissJob';
import fetchJobs from '../home/api/fetchJobs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const functions: { [key: string]: (...args: any[]) => Promise<unknown> } = {
    fetchJobs,
    applyToJob,
    dismissJob,
};

export default functions;
