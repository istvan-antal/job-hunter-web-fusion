import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { Job } from '../../../job-hunter/entities/Job.ts';

export const dataSource = await new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || -1),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: !!process.env.DB_LOGGING,
    entities: [Job],
    migrations: ['./migrations/*.ts'],
    subscribers: [],
}).initialize();
