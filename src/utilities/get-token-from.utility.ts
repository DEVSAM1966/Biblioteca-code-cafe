import { Request } from "express";

export function getTokenFrom(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(" ") ?? [];
  const isBearerToken = type === "Bearer";

  return isBearerToken ? token : undefined;
}
