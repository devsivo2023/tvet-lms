import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { setupTestDb, teardownTestDb } from './setup-tests';
import { TenantService } from '../src/modules/tenant/tenant.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let tenantService: TenantService;

  beforeAll(async () => {
    const { app: testApp, moduleFixture } = await setupTestDb();
    app = testApp;
    tenantService = moduleFixture.get<TenantService>(TenantService);
  });

  afterAll(async () => {
    await teardownTestDb(app);
  });

  beforeEach(async () => {
    // Create a test tenant
    await tenantService.create({
      name: 'Test Institution',
      domain: 'test.edu',
    });
  });

  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@test.edu',
        password: 'Test123!@#',
        firstName: 'Test',
        lastName: 'User',
        tenantDomain: 'test.edu'
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.access_token).toBeDefined();
        expect(res.body.user.email).toBe('test@test.edu');
      });
  });

  it('/auth/login (POST)', async () => {
    // First register a user
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'login@test.edu',
        password: 'Test123!@#',
        firstName: 'Login',
        lastName: 'User',
        tenantDomain: 'test.edu'
      });

    // Then try to login
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'login@test.edu',
        password: 'Test123!@#',
        tenantDomain: 'test.edu'
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.access_token).toBeDefined();
      });
  });
});
