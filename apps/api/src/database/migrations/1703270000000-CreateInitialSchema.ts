import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialSchema1703270000000 implements MigrationInterface {
  name = 'CreateInitialSchema1703270000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create tenants table
    await queryRunner.query(`
      CREATE TABLE "tenants" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "domain" varchar NOT NULL UNIQUE,
        "name" varchar NOT NULL,
        "settings" jsonb,
        "is_active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
      )
    `);

    // Create users table
    await queryRunner.query(`
      CREATE TYPE "user_role_enum" AS ENUM (
        'super_admin', 
        'institution_admin', 
        'instructor', 
        'student'
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "email" varchar NOT NULL UNIQUE,
        "password" varchar NOT NULL,
        "first_name" varchar NOT NULL,
        "last_name" varchar NOT NULL,
        "role" "user_role_enum" NOT NULL DEFAULT 'student',
        "tenant_id" uuid REFERENCES "tenants" ("id") ON DELETE CASCADE,
        "is_active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
      )
    `);

    // Create indexes
    await queryRunner.query(`
      CREATE INDEX "IDX_users_email" ON "users" ("email");
      CREATE INDEX "IDX_users_tenant" ON "users" ("tenant_id");
      CREATE INDEX "IDX_tenants_domain" ON "tenants" ("domain");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_users_email"`);
    await queryRunner.query(`DROP INDEX "IDX_users_tenant"`);
    await queryRunner.query(`DROP INDEX "IDX_tenants_domain"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
    await queryRunner.query(`DROP TABLE "tenants"`);
  }
}
