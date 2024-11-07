import { connectToDatabase } from '../../core/db';
import type { Job } from '../../core/job';

async function fetchJobs() {
    const collection = (await connectToDatabase()).collection('jobs');

    return (await collection.find({ hidden: { $not: { $eq: true } } }, { sort: [['created', 'desc']] }).toArray()).map(
        (item) => ({
            ...item,
            _id: item._id.toJSON(),
        }),
    ) as unknown as Job[];
}

export default fetchJobs;
