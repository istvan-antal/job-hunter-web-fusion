import { ObjectId } from 'mongodb';
import type { Context } from '../../core/context';
import { connectToDatabase } from '../../core/db';
import type { Job } from '../../core/job';

export default async function dismissJob(job: Job, _context: Context) {
    const collection = (await connectToDatabase()).collection('jobs');

    await collection.updateOne(
        { _id: new ObjectId(job._id) },
        { $set: { dismissed: true, hidden: true, updated: new Date() } },
    );
}