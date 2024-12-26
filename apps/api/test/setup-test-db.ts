
import { createConnection } from 'typeorm';
import { setupTestDataSource } from './jest-setup';

export async function setupTestDatabase() {
  const connection = await createConnection(setupTestDataSource);
  await connection.synchronize(true); // Clear database and run migrations
  await connection.close();
}

export async function teardownTestDatabase() {
  const connection = await createConnection(setupTestDataSource);
  await connection.dropDatabase();
  await connection.close();
}
