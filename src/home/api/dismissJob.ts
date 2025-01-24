// import { ObjectId } from 'mongodb';
import { Job } from '../../../../job-hunter/entities/Job';
import type { Context } from '../../core/context';
import { dataSource } from '../../core/db';
// import { connectToDatabase } from '../../core/db';
// import type { Job } from '../../core/job';

export default async function dismissJob(job: Job, _context: Context) {
    const repository = dataSource.getRepository(Job);

    await repository.update(
        {
            id: job.id,
        },
        { dismissed: true, hidden: true, updated: new Date() },
    );
}
