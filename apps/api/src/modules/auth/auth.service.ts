import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { TenantService } from '../tenant/tenant.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private tenantService: TenantService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ 
      where: { email },
      relations: ['tenant']
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: user.tenant?.id 
    };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    tenantDomain: string;
  }) {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: registerData.email }
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Find tenant
    const tenant = await this.tenantService.findByDomain(registerData.tenantDomain);

    // Create new user
    const hashedPassword = await bcrypt.hash(registerData.password, 10);
    const user = this.userRepository.create({
      ...registerData,
      password: hashedPassword,
      tenant,
    });

    await this.userRepository.save(user);

    const payload = { 
      sub: user.id,
      email: user.email,
      role: user.role,
      tenantId: tenant.id 
    };

    return {
      user: user.toJSON(),
      accessToken: this.jwtService.sign(payload),
    };
  }
}