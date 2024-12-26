import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Tenant } from '../../tenant/entities/tenant.entity';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  INSTITUTION_ADMIN = 'institution_admin',
  INSTRUCTOR = 'instructor',
  STUDENT = 'student'
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT
  })
  role!: UserRole;

  @ManyToOne(() => Tenant, tenant => tenant.users)
  tenant!: Tenant;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  toJSON() {
    const { password, ...userObject } = this;
    return userObject;
  }
}