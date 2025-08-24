import computeJobCompatibility from '../analyze/api/computeJobCompatibility';
import reAnalyze from '../analyze/api/reAnalyze';
import fetchPreferences from '../core/api/fetchPreferences';
import applyToJob from '../home/api/applyToJob';
import dismissJob from '../home/api/dismissJob';
import fetchJob from '../home/api/fetchJob';
import fetchJobs from '../home/api/fetchJobs';
import fetchStats from '../stats/api/fetchStats';

const functions = {
    fetchJobs,
    fetchJob,
    applyToJob,
    dismissJob,
    fetchPreferences,
    fetchStats,
    computeJobCompatibility,
    reAnalyze,
};

export default functions;
