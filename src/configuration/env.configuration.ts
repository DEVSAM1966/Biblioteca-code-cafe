import Joi from 'joi';
process.loadEnvFile();

const envValidation = Joi.object({
  PORT: Joi.number().default(9800),
  DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().required(),
  SALT_ROUNDS: Joi.number().default(10),
});

const { error, value: envVars } = envValidation.validate(process.env, {
  allowUnknown: true,
  abortEarly: false,
});

if (error) {
  throw new Error(`ENV Configuration error: ${error.message}`);
}

export const PORT: number = envVars.PORT;
export const JWT_SECRET: string = envVars.JWT_SECRET;
export const SALT_ROUNDS: number = envVars.SALT_ROUNDS;
export const DATABASE_URL: string = envVars.DATABASE_URL;
