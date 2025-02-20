import { Job } from '../../../../job-hunter/entities/Job';
import type { Context } from '../../core/context';
import { dataSource } from '../../core/db';

async function fetchJobs(_: Context): Promise<{ id: string; data: { value: number; date: string }[] }[]> {
    const repository = dataSource.getRepository(Job);

    return [
        {
            id: 'job',
            data: (
                await repository
                    .createQueryBuilder('j')
                    .select('COUNT(1) as "value", DATE(j.created) as "date"')
                    .groupBy('DATE(j.created)')
                    .orderBy('DATE(j.created)', 'DESC')
                    .getRawMany()
            ).map((item) => ({
                ...item,
                value: +item.value,
            })),
        },
        {
            id: 'applied',
            data: (
                await repository
                    .createQueryBuilder('j')
                    .select('COUNT(1) as "value", DATE(j.created) as "date"')
                    .where('j.applied IS TRUE')
                    .groupBy('DATE(j.created)')
                    .orderBy('DATE(j.created)', 'DESC')
                    .getRawMany()
            ).map((item) => ({
                ...item,
                value: +item.value,
            })),
        },
        {
            id: 'False negative suggestions',
            data: (
                await repository
                    .createQueryBuilder('j')
                    .select('COUNT(1) as "value", DATE(j.created) as "date"')
                    .where('j.applied IS TRUE AND j."suggestApply" IS FALSE')
                    .groupBy('DATE(j.created)')
                    .orderBy('DATE(j.created)', 'DESC')
                    .getRawMany()
            ).map((item) => ({
                ...item,
                value: +item.value,
            })),
        },
    ];
}

export default fetchJobs;
