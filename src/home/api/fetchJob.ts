import { Job } from '../../../../job-hunter/entities/Job';
import { dataSource } from '../../core/db';

async function fetchJob(id: number) {
    const repository = dataSource.getRepository(Job);

    return repository.findOneOrFail({ where: { id } });
}

export default fetchJob;
