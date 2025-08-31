import { Job } from '../../../../job-hunter/entities/Job';
import type { Context } from '../../core/context';
import { dataSource } from '../../core/db';

async function fetchJobs(
    granularity: 'daily' | 'weekly' | 'monthly' | 'yearly',
    _: Context,
): Promise<{
    rates: { id: string; data: { value: number; date: string }[] }[];
    counts: { id: string; data: { value: number; date: string }[] }[];
}> {
    const repository = dataSource.getRepository(Job);

    const getDateTrunc = (granularity: string) => {
        switch (granularity) {
            case 'daily':
                return 'DATE(j.created)';
            case 'weekly':
                return "DATE_TRUNC('week', j.created)";
            case 'monthly':
                return "DATE_TRUNC('month', j.created)";
            case 'yearly':
                return "DATE_TRUNC('year', j.created)";
            default:
                return 'DATE(j.created)';
        }
    };

    const dateTrunc = getDateTrunc(granularity);

    return {
        rates: [
            {
                id: 'dailyRate',
                data: (
                    await repository
                        .createQueryBuilder('j')
                        .select(`ROUND(AVG(("payRate" ->> 'max')::FLOAT)) AS "value", ${dateTrunc} as "date"`)
                        .where(
                            `"payRate" != '{"type": "unknown"}' AND 
                            "payRate" ->> 'currency' = 'GBP' AND 
                            "payRate" ->> 'type' = 'daily' AND 
                            "isInsideIr35" IS FALSE`,
                        )
                        .groupBy(dateTrunc)
                        .orderBy(dateTrunc, 'DESC')
                        .getRawMany()
                ).map((item) => ({
                    ...item,
                    value: +item.value,
                })),
            },
            {
                id: 'Suggested',
                data: (
                    await repository
                        .createQueryBuilder('j')
                        .select(`ROUND(AVG(("payRate" ->> 'max')::FLOAT)) AS "value", ${dateTrunc} as "date"`)
                        .where(
                            `"payRate" != '{"type": "unknown"}' AND 
                            "payRate" ->> 'currency' = 'GBP' AND 
                            "payRate" ->> 'type' = 'daily' AND 
                            "isInsideIr35" IS FALSE AND 
                            "suggestApply" IS TRUE`,
                        )
                        .groupBy(dateTrunc)
                        .orderBy(dateTrunc, 'DESC')
                        .getRawMany()
                ).map((item) => ({
                    ...item,
                    value: +item.value,
                })),
            },
            {
                id: 'Applied',
                data: (
                    await repository
                        .createQueryBuilder('j')
                        .select(`ROUND(AVG(("payRate" ->> 'max')::FLOAT)) AS "value", ${dateTrunc} as "date"`)
                        .where(
                            `"payRate" != '{"type": "unknown"}' AND 
                            "payRate" ->> 'currency' = 'GBP' AND 
                            "payRate" ->> 'type' = 'daily' AND 
                            "applied" IS TRUE`,
                        )
                        .groupBy(dateTrunc)
                        .orderBy(dateTrunc, 'DESC')
                        .getRawMany()
                ).map((item) => ({
                    ...item,
                    value: +item.value,
                })),
            },
        ],
        counts: [
            /*
            {
                id: 'job',
                data: (
                    await repository
                        .createQueryBuilder('j')
                        .select(`COUNT(1) as "value", ${dateTrunc} as "date"`)
                        .groupBy(dateTrunc)
                        .orderBy(dateTrunc, 'DESC')
                        .getRawMany()
                ).map((item) => ({
                    ...item,
                    value: +item.value,
                })),
            },
            */
            {
                id: 'Suggested',
                data: (
                    await repository
                        .createQueryBuilder('j')
                        .select(`COUNT(1) as "value", ${dateTrunc} as "date"`)
                        .where('j."suggestApply" IS TRUE')
                        .groupBy(dateTrunc)
                        .orderBy(dateTrunc, 'DESC')
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
                        .select(`COUNT(1) as "value", ${dateTrunc} as "date"`)
                        .where('j.applied IS TRUE')
                        .groupBy(dateTrunc)
                        .orderBy(dateTrunc, 'DESC')
                        .getRawMany()
                ).map((item) => ({
                    ...item,
                    value: +item.value,
                })),
            },
            /*
            {
                id: 'False negative suggestions',
                data: (
                    await repository
                        .createQueryBuilder('j')
                        .select(`COUNT(1) as "value", ${dateTrunc} as "date"`)
                        .where('j.applied IS TRUE AND j."suggestApply" IS FALSE')
                        .groupBy(dateTrunc)
                        .orderBy(dateTrunc, 'DESC')
                        .getRawMany()
                ).map((item) => ({
                    ...item,
                    value: +item.value,
                })),
            },
            {
                id: 'Unknown rates',
                data: (
                    await repository
                        .createQueryBuilder('j')
                        .select(`COUNT(1) as "value", ${dateTrunc} as "date"`)
                        .where(`"payRate" = '{"type": "unknown"}'`)
                        .groupBy(dateTrunc)
                        .orderBy(dateTrunc, 'DESC')
                        .getRawMany()
                ).map((item) => ({
                    ...item,
                    value: +item.value,
                })),
            },
            */
        ],
    };
}

export default fetchJobs;
