import { connectToDatabase } from '../../core/db';
import type { Context } from '../context';

async function fetchPreferences(_: Context) {
    const flaggedPhrasesCollection = (await connectToDatabase()).collection('flagged_phrases');

    const flaggedPhrases: string[] = (
        (
            await flaggedPhrasesCollection
                .find({ hidden: { $not: { $eq: true } } }, { sort: [['created', 'desc']] })
                .toArray()
        ).map((item) => ({
            ...item,
            _id: item._id.toJSON(),
        })) as unknown as { value: string }[]
    ).map((item) => item.value);

    return {
        flaggedPhrases,
        flaggedTitlePhrases: [] as string[],
        highlights: ['Duration', 'Location', 'Day Rate', 'Hybrid'],
        goodHighlights: ['Remote', 'Outside IR35'],
    };
}

export default fetchPreferences;
