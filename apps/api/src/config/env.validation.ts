import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  
  // Database
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  
  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('1d'),
  
  // Redis (optional)
  REDIS_HOST: Joi.string().optional(),
  REDIS_PORT: Joi.number().default(6379),
  
  // AWS (optional)
  //AWS_ACCESS_KEY_ID: Joi.string().optional(),
  //AWS_SECRET_ACCESS_KEY: Joi.string().optional(),
  //AWS_REGION: Joi.string().optional(),
  //AWS_BUCKET_NAME: Joi.string().optional(),
});
