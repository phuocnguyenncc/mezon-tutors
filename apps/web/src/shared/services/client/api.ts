export function getApiBaseUrl(): string {
  const env = process.env.NEXT_PUBLIC_API_BASE_URL
  return env && env.length > 0 ? env : 'http://localhost:4000/api'
}
