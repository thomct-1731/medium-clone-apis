import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export default registerAs(
  'database',
  (): DataSourceOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [path.join(__dirname, '..', '**', '*.entity{.ts,.js}')],
    migrations: [path.join(__dirname, '..', 'migrations', '*.{ts,js}')],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    synchronize: false,
    logging: true,
  }),
);
