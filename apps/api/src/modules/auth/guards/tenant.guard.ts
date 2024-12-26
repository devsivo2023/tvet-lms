import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TenantService } from '../../tenant/tenant.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

interface RequestWithUser extends Request {
  user?: {
    tenantId?: string;
  };
  tenant?: any;
}

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private tenantService: TenantService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const tenantDomain = request.headers?.get('x-tenant-domain') as string;

    if (!tenantDomain) {
      throw new UnauthorizedException('Tenant domain is required');
    }

    try {
      const tenant = await this.tenantService.findByDomain(tenantDomain);
      request.tenant = tenant;
      
      // If user is authenticated, verify they belong to this tenant
      if (request.user?.tenantId && request.user.tenantId !== tenant.id) {
        throw new UnauthorizedException('Invalid tenant access');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid tenant domain');
    }
  }
}