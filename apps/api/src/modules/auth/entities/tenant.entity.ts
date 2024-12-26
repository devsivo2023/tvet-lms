import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string = '';

  @Column({ unique: true })
  domain: string = '';

  @Column()
  name: string = '';

  @Column({ type: 'jsonb', nullable: true })
  settings: Record<string, any> = {};

  @Column({ default: true })
  isActive: boolean = true;

  @CreateDateColumn()
  createdAt: Date = new Date();

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}