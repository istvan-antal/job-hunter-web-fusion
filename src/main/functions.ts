import fetchJobs from '../home/api/fetchJobs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const functions: { [key: string]: (...args: any[]) => Promise<unknown> } = {
    fetchJobs,
};

export default functions;
