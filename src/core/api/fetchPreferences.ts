import type { Context } from '../context';

async function fetchPreferences(_: Context) {
    return {
        flaggedPhrases: [] as string[],
        flaggedTitlePhrases: [] as string[],
        highlights: ['Duration', 'Location', 'Day Rate', 'Hybrid'],
        goodHighlights: ['Remote', 'Outside IR35'],
    };
}

export default fetchPreferences;
