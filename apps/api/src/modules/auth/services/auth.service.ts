import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { TenantService } from '../../tenant/tenant.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private tenantService: TenantService,
  ) {}

  async validateUser(email: string, password: string, tenantDomain: string): Promise<any> {
    const tenant = await this.tenantService.findByDomain(tenantDomain);
    const user = await this.userService.findOne({ email, tenantId: tenant.id });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string, tenantDomain: string) {
    const user = await this.validateUser(email, password, tenantDomain);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      tenantId: user.tenant.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const tenant = await this.tenantService.findByDomain(registerDto.tenantDomain);
    
    // Check if user exists
    const existingUser = await this.userService.findOne({ 
      email: registerDto.email, 
      tenantId: tenant.id 
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.userService.create({
      ...registerDto,
      password: hashedPassword,
      tenant,
    });

    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      tenantId: tenant.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}