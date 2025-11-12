import type { EnvSchemaModel } from '../models/env-schema.model'
import Joi from 'joi'
process.loadEnvFile()

const envSchema = Joi.object<EnvSchemaModel>({
  PORT: Joi.number().default(9800),
  DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().required(),
  SALT_ROUNDS: Joi.number().default(10),
})


const { error, value } = envSchema.validate(process.env, {
  allowUnknown: true,
  abortEarly: false,
})

if (error) {
  throw new Error(`ENV Configuration error: ${error.message}`)
}

export const environment = {
  port: value.PORT,
  jwt: {
    secret: value.JWT_SECRET,
    saltRounds: value.SALT_ROUNDS
  }
}
