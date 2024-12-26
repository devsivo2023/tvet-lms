import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { TenantService } from '../../tenant/tenant.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TenantStrategy extends PassportStrategy(Strategy, 'tenant') {
  constructor(
    private tenantService: TenantService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const domain = req.headers['x-tenant-domain'] as string;
    if (!domain) {
      throw new UnauthorizedException('No tenant domain provided');
    }

    const tenant = await this.tenantService.findByDomain(domain);
    if (!tenant) {
      throw new UnauthorizedException('Invalid tenant');
    }

    // Verify that the user belongs to this tenant
    if (payload.tenantId !== tenant.id) {
      throw new UnauthorizedException('User does not belong to this tenant');
    }

    return {
      ...payload,
      tenant,
    };
  }
}