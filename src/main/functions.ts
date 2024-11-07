import fetchPreferences from '../core/api/fetchPreferences';
import applyToJob from '../home/api/applyToJob';
import dismissJob from '../home/api/dismissJob';
import fetchJobs from '../home/api/fetchJobs';
import addFlaggedPhrase from '../preferences/api/addFlaggedPhrase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const functions: { [key: string]: (...args: any[]) => Promise<unknown> } = {
    fetchJobs,
    applyToJob,
    dismissJob,
    fetchPreferences,
    addFlaggedPhrase,
};

export default functions;
