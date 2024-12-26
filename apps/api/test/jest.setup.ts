
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

export const setupTestDataSource = {
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'tvet_lms_test',
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: true, // Only for testing
  logging: false,
};

export async function createTestingApp(): Promise<{
  app: INestApplication;
  module: TestingModule;
}> {
  const moduleRef = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env.test',
      }),
      TypeOrmModule.forRoot(setupTestDataSource),
      // Add other necessary modules
    ],
  }).compile();

  const app = moduleRef.createNestApplication();
  await app.init();

  return { app, module: moduleRef };
}