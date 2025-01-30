import computeJobCompatibility from '../analyze/api/computeJobCompatibility';
import fetchPreferences from '../core/api/fetchPreferences';
import applyToJob from '../home/api/applyToJob';
import dismissJob from '../home/api/dismissJob';
import fetchJob from '../home/api/fetchJob';
import fetchJobs from '../home/api/fetchJobs';
import addFlaggedPhrase from '../preferences/api/addFlaggedPhrase';
import fetchStats from '../stats/api/fetchStats';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const functions: { [key: string]: (...args: any[]) => Promise<unknown> } = {
    fetchJobs,
    fetchJob,
    applyToJob,
    dismissJob,
    fetchPreferences,
    addFlaggedPhrase,
    fetchStats,
    computeJobCompatibility,
};

export default functions;
