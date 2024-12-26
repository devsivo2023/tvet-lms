// src/modules/auth/services/__tests__/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { TenantService } from '../../../tenant/tenant.service';
import { createMockUser } from '../../../../../test/utils/test-utils';
import { User, UserRole } from '../../entities/user.entity';
import { Tenant } from '../../../tenant/entities/tenant.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;
  let tenantService: jest.Mocked<TenantService>;

  const mockTenant: Tenant = {
    id: 'tenant-id',
    domain: 'tenant-domain',
    name: 'Tenant Name',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    users: [],
  };

  const mockUser: User = {
    id: 'user-id',
    email: 'test@example.com',
    password: 'hashedPassword',
    role: UserRole.STUDENT,
    firstName: 'John',
    lastName: 'Doe',
    tenant: mockTenant,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    toJSON: function() {
      const { password, ...userObject } = this;
      return userObject;
    }
  };

  beforeEach(async () => {
    const mockServices = {
      userService: {
        findOne: jest.fn(),
        create: jest.fn(),
      },
      jwtService: {
        sign: jest.fn(),
      },
      tenantService: {
        findByDomain: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockServices.userService,
        },
        {
          provide: JwtService,
          useValue: mockServices.jwtService,
        },
        {
          provide: TenantService,
          useValue: mockServices.tenantService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
    tenantService = module.get(TenantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user without password when credentials are valid', async () => {
      tenantService.findByDomain.mockResolvedValue(mockTenant);
      userService.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser(
        'test@example.com',
        'password',
        'test-domain'
      );
      
      expect(result).toBeDefined();
      expect(result.password).toBeUndefined();
    });

    it('should return null when credentials are invalid', async () => {
      tenantService.findByDomain.mockResolvedValue(mockTenant);
      userService.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser(
        'test@example.com',
        'incorrect-password',
        'test-domain'
      );
      
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user data when login is successful', async () => {
      const { password, ...userWithoutPassword } = mockUser;

      jest.spyOn(service, 'validateUser').mockResolvedValue(userWithoutPassword);
      jwtService.sign.mockReturnValue('jwt.token.here');

      const result = await service.login(
        'test@example.com',
        'password',
        'test-domain'
      );

      expect(result.access_token).toBe('jwt.token.here');
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(mockUser.email);
    });

    it('should throw UnauthorizedException when login fails', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      await expect(
        service.login('test@example.com', 'incorrect-password', 'test-domain')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('register', () => {
    const registerDto = {
      email: 'newuser@example.com',
      password: 'password123',
      firstName: 'Jane',
      lastName: 'Doe',
      role: UserRole.STUDENT,
      tenantDomain: 'test-domain'
    };

    const hashedPassword = 'hashedPassword123';

    beforeEach(() => {
      tenantService.findByDomain.mockResolvedValue(mockTenant);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    });

    it('should successfully register a new user', async () => {
      const createdUser: User = {
        ...mockUser,
        email: registerDto.email,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        toJSON: function() {
          const { password, ...userObject } = this;
          return userObject;
        }
      };

      userService.findOne.mockResolvedValue(undefined);
      userService.create.mockResolvedValue(createdUser);
      jwtService.sign.mockReturnValue('jwt.token.here');

      const result = await service.register(registerDto);

      expect(result).toEqual({
        access_token: 'jwt.token.here',
        user: {
          id: createdUser.id,
          email: createdUser.email,
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          role: createdUser.role,
        },
      });

      expect(userService.create).toHaveBeenCalledWith({
        ...registerDto,
        password: hashedPassword,
        tenant: mockTenant,
      });
    });

    it('should throw ConflictException if user already exists', async () => {
      userService.findOne.mockResolvedValue(mockUser);

      await expect(service.register(registerDto)).rejects.toThrow('User already exists');

      expect(userService.create).not.toHaveBeenCalled();
    });

    it('should throw an error if tenant is not found', async () => {
      tenantService.findByDomain.mockRejectedValue(new Error('Tenant not found'));

      await expect(service.register(registerDto)).rejects.toThrow('Tenant not found');
      
      expect(userService.findOne).not.toHaveBeenCalled();
      expect(userService.create).not.toHaveBeenCalled();
    });

    it('should hash the password before creating user', async () => {
      userService.findOne.mockResolvedValue(undefined);
      userService.create.mockResolvedValue(mockUser);

      await service.register(registerDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(registerDto.password, 10);
      expect(userService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          password: hashedPassword,
        })
      );
    });
  });
});