import computeJobCompatibility from '../analyze/api/computeJobCompatibility';
import reAnalyze from '../analyze/api/reAnalyze';
import fetchPreferences from '../core/api/fetchPreferences';
import applyToJob from '../home/api/applyToJob';
import dismissJob from '../home/api/dismissJob';
import fetchJob from '../home/api/fetchJob';
import fetchJobs from '../home/api/fetchJobs';
import addFlaggedPhrase from '../preferences/api/addFlaggedPhrase';
import fetchStats from '../stats/api/fetchStats';

const functions = {
    fetchJobs,
    fetchJob,
    applyToJob,
    dismissJob,
    fetchPreferences,
    addFlaggedPhrase,
    fetchStats,
    computeJobCompatibility,
    reAnalyze,
};

export default functions;
