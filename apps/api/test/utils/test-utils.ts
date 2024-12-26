// test/utils/test-utils.ts

import { UserRole } from '../../src/modules/auth/entities/user-role.enum';
import { User } from '../../src/modules/auth/entities/user.entity';

export const createMockUser = (overrides = {}): Partial<User> => ({
  id: 'test-user-id',
  email: 'test@example.com',
  password: 'hashedPassword',
  role: UserRole.STUDENT,
  firstName: 'John',
  lastName: 'Doe',
  tenant: {
    id: 'test-tenant-id',
    domain: 'test-domain',
    name: 'Test Tenant',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    users: []
  },
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides
});

export const createMockTenant = (overrides = {}) => ({
  id: 'test-tenant-id',
  domain: 'test-domain',
  name: 'Test Tenant',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  users: [],
  ...overrides
});