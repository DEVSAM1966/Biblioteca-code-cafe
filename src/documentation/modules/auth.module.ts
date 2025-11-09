import { ErrorOutDto } from "../schemas/error-out-dto.schema";
import { LoginInDto } from "../schemas/login-in-dto.schema";
import { RegisterInDto } from "../schemas/register-in-dto.schema";
import { SignOutDto } from "../schemas/sign-out-dto.schema";

export const AuthModuleDocs = {
  '/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Register a new user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: RegisterInDto
          },
        },
      },
      responses: {
        201: {
          description: 'User registered successfully',
          content: {
            'application/json': {
              schema: SignOutDto
            },
          },
        },
        409: {
          description: 'Conflict - User already exists',
          content: {
            'application/json': {
              schema: ErrorOutDto
            },
          },
        },
      },
    },
  },

  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login a user',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: LoginInDto
          },
        },
      },
      responses: {
        200: {
          description: 'User logged in successfully',
          content: {
            'application/json': {
              schema: SignOutDto
            },
          },
        },
      },
    },
  },
};
