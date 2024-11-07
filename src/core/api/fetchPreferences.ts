import { connectToDatabase } from '../../core/db';

async function fetchPreferences() {
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
        goodHighlights: ['Remote'],
    };
}

export default fetchPreferences;
