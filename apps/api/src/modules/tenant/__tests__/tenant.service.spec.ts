// src/modules/tenant/__tests__/tenant.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TenantService } from '../tenant.service';
import { Tenant } from '../entities/tenant.entity';
import { createMockTenant } from '../../../../test/utils/test-utils';

describe('TenantService', () => {
  let service: TenantService;
  let repository: jest.Mocked<Repository<Tenant>>;

  beforeEach(async () => {
    const mockRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantService,
        {
          provide: getRepositoryToken(Tenant),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TenantService>(TenantService);
    repository = module.get(getRepositoryToken(Tenant));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByDomain', () => {
    it('should return tenant when found', async () => {
      const mockTenant = createMockTenant();
      repository.findOne.mockResolvedValue(mockTenant);

      const result = await service.findByDomain('test-domain');

      expect(result).toEqual(mockTenant);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { domain: 'test-domain' },
      });
    });

    it('should return null when tenant not found', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await service.findByDomain('non-existent-domain');

      expect(result).toBeNull();
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { domain: 'non-existent-domain' },
      });
    });
  });

  describe('findById', () => {
    it('should return tenant when found', async () => {
      const mockTenant = createMockTenant();
      repository.findOne.mockResolvedValue(mockTenant);

      const result = await service.findById('test-id');

      expect(result).toEqual(mockTenant);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 'test-id' },
      });
    });

    it('should return null when tenant not found', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await service.findById('non-existent-id');

      expect(result).toBeNull();
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 'non-existent-id' },
      });
    });
  });

  describe('create', () => {
    it('should create and return a new tenant', async () => {
      const mockTenant = createMockTenant();
      const createTenantDto = {
        name: 'Test Tenant',
        domain: 'test-domain',
      };

      repository.create.mockReturnValue(mockTenant);
      repository.save.mockResolvedValue(mockTenant);

      const result = await service.create(createTenantDto);

      expect(result).toEqual(mockTenant);
      expect(repository.create).toHaveBeenCalledWith(createTenantDto);
      expect(repository.save).toHaveBeenCalledWith(mockTenant);
    });
  });
});