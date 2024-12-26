// src/modules/auth/guards/__tests__/roles.guard.spec.ts
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../roles.guard';
import { UserRole } from '../../entities/user-role.enum';
import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext } from '@nestjs/common';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    rolesGuard = new RolesGuard(reflector);
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });

  it('should allow access for users with the required role', () => {
    const mockContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            id: 'user-id',
            email: 'test@example.com',
            role: UserRole.TEACHER,
            firstName: 'Test',
            lastName: 'Teacher'
          },
        }),
      }),
    });

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.TEACHER]);

    expect(rolesGuard.canActivate(mockContext)).toBe(true);
  });

  it('should deny access for users without the required role', () => {
    const mockContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            id: 'user-id',
            email: 'test@example.com',
            role: UserRole.STUDENT,
            firstName: 'Test',
            lastName: 'Student'
          },
        }),
      }),
    });

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.TEACHER]);

    expect(rolesGuard.canActivate(mockContext)).toBe(false);
  });

  it('should allow access when no roles are required', () => {
    const mockContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            id: 'user-id',
            email: 'test@example.com',
            role: UserRole.STUDENT,
            firstName: 'Test',
            lastName: 'Student'
          },
        }),
      }),
    });

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

    expect(rolesGuard.canActivate(mockContext)).toBe(true);
  });

  it('should handle unauthorized users', () => {
    const mockContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          user: null,
        }),
      }),
    });

    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.TEACHER]);

    expect(rolesGuard.canActivate(mockContext)).toBe(false);
  });
});