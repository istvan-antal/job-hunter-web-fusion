import type { Context } from '../../core/context';
import { connectToDatabase } from '../../core/db';

async function addFlaggedPhrase(value: string, _context: Context) {
    const flaggedPhrasesCollection = (await connectToDatabase()).collection('flagged_phrases');

    flaggedPhrasesCollection.insertOne({
        value,
    });

    return undefined;
}

export default addFlaggedPhrase;
