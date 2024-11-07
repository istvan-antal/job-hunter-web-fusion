import { useMemo } from 'react';
import { createServerHook } from '../../core/serverHooksCreators';
import type dismissJob from '../api/dismissJob';

const useDismissJob = () => useMemo(() => createServerHook<typeof dismissJob>('dismissJob'), []);

export default useDismissJob;
