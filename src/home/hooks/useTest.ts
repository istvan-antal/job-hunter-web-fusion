import { useMemo } from 'react';
import type test from '../../core/api/test';
import { createServerHook } from '../../core/serverHooksCreators';

const useTest = () => useMemo(() => createServerHook<typeof test>('test'), []);

export default useTest;
