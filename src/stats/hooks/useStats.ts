import { createServerQueryHook } from '../../core/serverHooksCreators';
import type fetchStats from '../../stats/api/fetchStats';

const useStats = createServerQueryHook<typeof fetchStats>('fetchStats');

export default useStats;
