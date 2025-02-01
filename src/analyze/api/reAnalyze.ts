import { Job } from '../../../../job-hunter/entities/Job';
import type { Context } from '../../core/context';
import { dataSource } from '../../core/db';

async function reAnalyze(id: number, _context: Context) {
    const repository = dataSource.getRepository(Job);
    const job = await repository.findOneOrFail({ where: { id } });
    job.reAnalyze = true;
    await repository.save(job);
}

export default reAnalyze;
