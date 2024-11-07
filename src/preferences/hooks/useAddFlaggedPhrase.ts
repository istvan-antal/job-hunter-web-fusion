import { useMemo } from 'react';
import { createServerHook } from '../../core/serverHooksCreators';
import type addFlaggedPhrase from '../api/addFlaggedPhrase';

const useAddFlaggedPhrase = () => useMemo(() => createServerHook<typeof addFlaggedPhrase>('addFlaggedPhrase'), []);

export default useAddFlaggedPhrase;
