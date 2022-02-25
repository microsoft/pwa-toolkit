import * as jose from 'jose'

import type { ExternalUser } from '../types'

export async function verifyAuthToken(
  token: string,
  publicKey: jose.JWK,
): Promise<ExternalUser | unknown> {
  try {
    const key = await jose.importJWK(publicKey, 'RS256')
    const { payload } = await jose.jwtVerify(token, key, {
      algorithms: [process.env.JWT_SIGNING_ALG ?? 'RS256'],
      issuer: process.env.JWT_ISSUER!,
      audience: process.env.JWT_AUDIENCE!,
    })

    if (payload != null) {
      return payload as ExternalUser
    }
  } catch (ex) {
    return ex
  }
}
