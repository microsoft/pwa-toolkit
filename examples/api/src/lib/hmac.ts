/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as jose from 'jose'

export async function generateHmacSigningKey(): Promise<jose.JWK> {
  const secret = await jose.generateSecret('HS256', { extractable: true })
  const jwkKey = await jose.exportJWK(secret)
  return jwkKey
}
