import { createServerQueryHook } from '../../core/serverHooksCreators';
import type fetchJob from '../../home/api/fetchJob';

const useJob = createServerQueryHook<typeof fetchJob>('fetchJob');

export default useJob;
