import type { FindOptionsWhere } from 'typeorm';
import { Not } from 'typeorm';
import { Job } from '../../../../job-hunter/entities/Job';
import type { Context } from '../../core/context';
import { dataSource } from '../../core/db';

async function fetchJobs(
    {
        hidden,
        unknownPayRate,
        knownPayRate,
        limit,
    }: { hidden?: boolean; unknownPayRate?: boolean; knownPayRate?: boolean; limit?: number },
    _: Context,
) {
    const repository = dataSource.getRepository(Job);

    const where: FindOptionsWhere<Job> = { hidden };

    if (unknownPayRate) {
        where.payRate = { type: 'unknown' };
    }

    if (knownPayRate) {
        where.payRate = Not({ type: 'unknown' });
    }

    return repository.find({
        where,
        order: {
            created: 'DESC',
        },
        take: limit,
    });
}

export default fetchJobs;
