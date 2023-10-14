import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as env from 'dotenv';

env.config();

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'production' ? false : true,
  logging: process.env.NODE_ENV === 'production' ? false : true,
  autoLoadEntities: true,
  charset: 'utf8mb4',
  extra: {
    charset: 'utf8mb4_general_ci',
  },
};
