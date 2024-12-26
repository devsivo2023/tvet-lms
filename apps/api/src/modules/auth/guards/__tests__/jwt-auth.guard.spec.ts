// src/modules/auth/guards/__tests__/jwt-auth.guard.spec.ts

import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { createMockExecutionContext } from '../../../../../test/utils/test-utils';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true for authenticated requests', async () => {
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            isAuthenticated: () => true,
            user: { id: 'test-id' }
          })
        })
      } as ExecutionContext;

      const result = await guard.canActivate(mockContext);
      expect(result).toBe(true);
    });

    it('should return false for unauthenticated requests', async () => {
      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => ({
            isAuthenticated: () => false
          })
        })
      } as ExecutionContext;

      const result = await guard.canActivate(mockContext);
      expect(result).toBe(false);
    });
  });
});
