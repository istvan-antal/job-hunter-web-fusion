import { useMemo } from 'react';
import { createServerHook } from '../../core/serverHooksCreators';
import type applyToJob from '../api/applyToJob';

const useApplyToJob = () => useMemo(() => createServerHook<typeof applyToJob>('applyToJob'), []);

export default useApplyToJob;
