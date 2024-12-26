import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(options: { email: string; tenantId: string }): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        email: options.email,
        tenant: { id: options.tenantId },
        isActive: true
      },
      relations: ['tenant']
    });

    return user || undefined;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, isActive: true },
      relations: ['tenant']
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async create(createUserData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(createUserData);
    return await this.userRepository.save(user);
  }

  async update(id: string, updateUserData: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, updateUserData);
    return await this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    user.isActive = false;
    await this.userRepository.save(user);
  }
}