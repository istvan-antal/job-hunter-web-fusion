import type fetchPreferences from '../api/fetchPreferences';
import { createServerQueryHook } from '../serverHooksCreators';

const usePreferences = createServerQueryHook<typeof fetchPreferences>('fetchPreferences');

export default usePreferences;
