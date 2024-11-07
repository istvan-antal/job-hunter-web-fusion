import Alert from '@mui/material/Alert';
import { memo, type ReactNode } from 'react';
import usePreferences from '../hooks/usePreferences';
import PreferenceContext from './PreferenceContext';

const PreferenceProvider = memo(({ children }: { children: ReactNode }) => {
    const { error, loading, data } = usePreferences({
        params: [],
    });

    if (error) {
        return <Alert severity="error">{error.toString()}</Alert>;
    }

    if (loading) {
        return null;
    }

    return <PreferenceContext.Provider value={data}>{children}</PreferenceContext.Provider>;
});

export default PreferenceProvider;
