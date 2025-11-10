import { LoginInDto } from "../schemas/login-in-dto.auth.schema";
import { SignOutDto } from "../schemas/sign-out-dto.auth.schema";
import { SuccesfulResponse } from "../../schemas/successful-response.schema";
import type { OpenAPIV3 } from 'openapi-types';

export const LoginAuthPath: OpenAPIV3.PathsObject = {
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
              schema: SuccesfulResponse(SignOutDto)
            },
          },
        },
      },
    },
  },
}