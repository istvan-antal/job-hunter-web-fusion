import { Job } from '../../../../job-hunter/entities/Job';
import { dataSource } from '../../core/db';

async function fetchJobs() {
    const repository = dataSource.getRepository(Job);

    return repository.find({
        where: { hidden: false },
        order: {
            created: 'DESC',
        },
    });
}

export default fetchJobs;
