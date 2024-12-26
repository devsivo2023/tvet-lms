// src/modules/auth/controllers/__tests__/auth.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../../auth.service';
import { LoginDto } from '../../dto/login.dto';
import { RegisterDto } from '../../dto/register.dto';
import { User, UserRole } from '../../entities/user.entity';
import { Tenant } from '../../../tenant/entities/tenant.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  const mockTenant: Tenant = {
    id: 'tenant-id',
    name: 'Test Tenant',
    domain: 'example.com',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    users: [],
  };

  const mockUser: Omit<User, 'toJSON' | 'password'> = {
    id: 'user-id',
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: UserRole.STUDENT,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    tenant: mockTenant,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService) as jest.Mocked<AuthService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login a user', async () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
      tenantDomain: 'example.com',
    };

    const result = {
      accessToken: 'token',
      user: mockUser,
    };

    authService.login.mockResolvedValue(result);

    expect(await controller.login(loginDto)).toBe(result);
  });

  it('should register a user', async () => {
    const registerDto: RegisterDto = {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.STUDENT,
      tenantDomain: 'example.com',
    };

    const result = {
      accessToken: 'token',
      user: mockUser,
    };

    authService.register.mockResolvedValue(result);

    expect(await controller.register(registerDto)).toBe(result);
  });
});