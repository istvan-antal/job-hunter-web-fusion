import { createContext } from 'react';

const PreferenceContext = createContext({
    flaggedPhrases: [] as string[],
    flaggedTitlePhrases: [] as string[],
    highlights: ['Duration', 'Location', 'Day Rate', 'Hybrid'],
    goodHighlights: ['Remote'],
});

export default PreferenceContext;
