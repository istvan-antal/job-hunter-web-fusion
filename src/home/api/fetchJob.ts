import { Job } from '../../../../job-hunter/entities/Job';
import type { Context } from '../../core/context';
import { dataSource } from '../../core/db';

async function fetchJob(id: number, _: Context) {
    const repository = dataSource.getRepository(Job);

    return repository.findOneOrFail({ where: { id } });
}

export default fetchJob;
