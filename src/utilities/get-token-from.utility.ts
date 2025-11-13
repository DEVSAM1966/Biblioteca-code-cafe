export function getTokenFrom(header: string): string | undefined {
  const [type, token] = header?.split(' ') ?? []
  const isBearerToken = type === 'Bearer'

  return isBearerToken ? token : undefined
}
