import * as jose from 'jose'

export async function generateHmacSigningKey(): Promise<jose.JWK> {
  const secret = await jose.generateSecret('HS256', { extractable: true })
  const jwkKey = await jose.exportJWK(secret)
  return jwkKey
}
