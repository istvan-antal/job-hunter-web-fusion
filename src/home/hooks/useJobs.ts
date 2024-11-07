import { createServerQueryHook } from '../../core/serverHooksCreators';
import type fetchJobs from '../api/fetchJobs';

const useJobs = createServerQueryHook<typeof fetchJobs>('fetchJobs');

export default useJobs;
