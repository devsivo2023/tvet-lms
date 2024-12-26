// src/modules/tenant/__tests__/tenant.middleware.spec.ts
import { TenantMiddleware } from '../middleware/tenant.middleware';
import { TenantService } from '../tenant.service';
import { Tenant } from '../entities/tenant.entity';
import { Request, Response } from 'express';

interface MockRequest extends Request {
  tenant?: Tenant;
}

describe('TenantMiddleware', () => {
  let middleware: TenantMiddleware;
  let tenantService: jest.Mocked<TenantService>;

  beforeEach(() => {
    tenantService = {
      findByDomain: jest.fn(),
    } as any;

    middleware = new TenantMiddleware(tenantService);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should set tenant on request object', async () => {
    const mockRequest: MockRequest = {
      get: jest.fn().mockReturnValue('example.com'),
    } as any;
    const mockResponse = {} as Response;
    const mockNext = jest.fn();
    
    const mockTenant: Tenant = {
      id: 'tenant-id',
      name: 'Test Tenant',
      domain: 'example.com',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      users: [],
    };

    tenantService.findByDomain.mockResolvedValue(mockTenant);

    await middleware.use(mockRequest, mockResponse, mockNext);

    expect(mockRequest.tenant).toBeDefined();
    expect(mockNext).toHaveBeenCalled();
  });

  it('should handle tenant not found', async () => {
    const mockRequest: MockRequest = {
      get: jest.fn().mockReturnValue('example.com'),
    } as any;
    const mockResponse = {} as Response;
    const mockNext = jest.fn();

    // Return a promise that resolves to null instead of undefined
    tenantService.findByDomain.mockResolvedValue(null as unknown as Tenant);

    await middleware.use(mockRequest, mockResponse, mockNext);

    expect(mockRequest.tenant).toBeUndefined();
    expect(mockNext).toHaveBeenCalled();
  });

  describe('use', () => {
    it('should attach tenant to request when found', async () => {
      const mockTenant: Tenant = {
        id: 'tenant-id',
        name: 'Test Tenant',
        domain: 'test-domain',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        users: [],
      };

      const mockRequest: MockRequest = {
        get: jest.fn().mockReturnValue('test-domain'),
      } as any;
      const mockResponse = {} as Response;
      const nextFunction = jest.fn();

      tenantService.findByDomain.mockResolvedValue(mockTenant);

      await middleware.use(mockRequest, mockResponse, nextFunction);

      expect(mockRequest.tenant).toEqual(mockTenant);
      expect(nextFunction).toHaveBeenCalled();
      expect(tenantService.findByDomain).toHaveBeenCalledWith('test-domain');
    });

    it('should not attach tenant when not found', async () => {
      const mockRequest: MockRequest = {
        get: jest.fn().mockReturnValue('non-existent-domain'),
      } as any;
      const mockResponse = {} as Response;
      const nextFunction = jest.fn();

      // Return a promise that resolves to null instead of undefined
      tenantService.findByDomain.mockResolvedValue(null as unknown as Tenant);

      await middleware.use(mockRequest, mockResponse, nextFunction);

      expect(mockRequest.tenant).toBeUndefined();
      expect(nextFunction).toHaveBeenCalled();
      expect(tenantService.findByDomain).toHaveBeenCalledWith('non-existent-domain');
    });
  });
});