import { join } from 'path';

export default () => ({
  database: {
    type: process.env.TYPEORM_TYPE,
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10) || 3306,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [join(__dirname, '/../**/*.entity.{js,ts}')],
    logging: false,
    migrationsRun: false,
    synchronize: false,
    timezone: 'local',
  },
});
