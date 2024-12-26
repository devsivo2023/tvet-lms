// src/modules/tenant/middleware/tenant.middleware.ts
import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantService } from '../tenant.service';
import { Tenant } from '../entities/tenant.entity';

// Extend Express Request type to include tenant
declare global {
  namespace Express {
    interface Request {
      tenant?: Tenant;
    }
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private tenantService: TenantService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const hostname = req.hostname;
    // Skip tenant resolution for authentication routes
    if (req.path.startsWith('/api/auth')) {
      return next();
    }

    try {
      const tenant = await this.tenantService.findByDomain(hostname);
      req.tenant = tenant;
      next();
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({
          statusCode: 404,
          message: 'Tenant not found',
        });
      } else {
        next(error);
      }
    }
  }
}