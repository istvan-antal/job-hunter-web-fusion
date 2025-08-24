import type { FindOperator, FindOptionsWhere } from 'typeorm';
import { Between, Not } from 'typeorm';
import { Job } from '../../../../job-hunter/entities/Job';
import type { Context } from '../../core/context';
import { dataSource } from '../../core/db';

async function fetchJobs(
    {
        hidden,
        unknownPayRate,
        knownPayRate,
        limit,
        todayOnly,
    }: {
        hidden?: boolean;
        unknownPayRate?: boolean;
        knownPayRate?: boolean;
        limit?: number;
        todayOnly?: boolean;
    },
    _: Context,
) {
    const repository = dataSource.getRepository(Job);

    type JobWhere = FindOptionsWhere<Job> & { created?: FindOperator<Date> };
    const where: JobWhere = { hidden };

    if (unknownPayRate) {
        where.payRate = { type: 'unknown' };
    }

    if (knownPayRate) {
        where.payRate = Not({ type: 'unknown' });
    }

    if (todayOnly) {
        const now = new Date();
        const startOfToday = new Date(now);
        startOfToday.setHours(0, 0, 0, 0);
        const startOfTomorrow = new Date(startOfToday);
        startOfTomorrow.setDate(startOfToday.getDate() + 1);

        // created is a timestamptz, Between is inclusive on both ends
        // Use [startOfToday, startOfTomorrow) by subtracting 1ms to keep strictly today
        const endExclusive = new Date(startOfTomorrow.getTime() - 1);
        where.created = Between(startOfToday, endExclusive);
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
