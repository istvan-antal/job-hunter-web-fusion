import { useMemo } from 'react';
import { createServerHook } from '../../core/serverHooksCreators';
import type reAnalyze from '../api/reAnalyze';

const useReAnalyze = () => useMemo(() => createServerHook<typeof reAnalyze>('reAnalyze'), []);

export default useReAnalyze;
