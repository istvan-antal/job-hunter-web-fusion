import { Job } from '../../../../job-hunter/entities/Job';
import type { Context } from '../../core/context';
import { dataSource } from '../../core/db';

async function fetchJobs(_: Context) {
    const repository = dataSource.getRepository(Job);

    return repository.find({
        where: { hidden: false },
        order: {
            created: 'DESC',
        },
    });
}

export default fetchJobs;
