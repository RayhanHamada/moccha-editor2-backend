import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

export const connections: ConnectionOptions[] = [
  {
    type: 'mongodb',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity.{ts,js}'],
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
];

export const dbModules = connections.map(conn => TypeOrmModule.forRoot(conn));
