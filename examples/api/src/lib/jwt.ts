/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as jose from 'jose'

// import type { ExternalUser } from '../types'

export async function verifyAuthToken<T>(
  token: string,
  publicKey: jose.JWK,
): Promise<T | unknown> {
  try {
    const key = await jose.importJWK(publicKey, 'RS256')
    const { payload } = await jose.jwtVerify(token, key, {
      algorithms: [process.env.JWT_SIGNING_ALG ?? 'RS256'],
      issuer: process.env.JWT_ISSUER!,
      audience: process.env.JWT_AUDIENCE!,
    })

    if (payload != null) {
      return payload as unknown as T
    }
  } catch (ex) {
    return ex
  }
}
