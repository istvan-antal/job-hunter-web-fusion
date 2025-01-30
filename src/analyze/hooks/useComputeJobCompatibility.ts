import { useMemo } from 'react';
import { createServerHook } from '../../core/serverHooksCreators';
import type computeJobCompatibility from '../api/computeJobCompatibility';

const useComputeJobCompatibility = () =>
    useMemo(() => createServerHook<typeof computeJobCompatibility>('computeJobCompatibility'), []);

export default useComputeJobCompatibility;
