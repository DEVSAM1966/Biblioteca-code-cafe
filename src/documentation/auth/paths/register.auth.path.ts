import { FailureResponse } from "../../schemas/failure-response.schema";
import { RegisterInDto } from "../schemas/register-in-dto.schema";
import { SignOutDto } from "../schemas/sign-out-dto.schema";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import type { OpenAPIV3 } from 'openapi-types';

export const RegisterAuthPath: OpenAPIV3.PathsObject = {
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
              schema: SuccesfulResponse(SignOutDto)
            },
          },
        },
        409: {
          description: 'Conflict - User already exists',
          content: {
            'application/json': {
              schema: FailureResponse({
                type: 'string',
                example: 'User already exists'
              })
            },
          },
        },
      },
    },
  },
}