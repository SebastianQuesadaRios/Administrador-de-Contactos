import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '3306'),
  username: process.env.DATABASE_USER ?? 'root',
  password: process.env.DATABASE_PASSWORD ?? 'root',
  database: process.env.DATABASE_NAME ?? 'contacts_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // No usar en producción
  retryDelay: 3000,     // Espera 3 segundos entre intentos
  retryAttempts: 10,    // Intenta 10 veces
}; 