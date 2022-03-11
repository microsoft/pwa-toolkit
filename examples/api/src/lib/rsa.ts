/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as jose from 'jose'

export async function generateRSAKeys(): Promise<{
  publicJWK: jose.JWK
  privateJWK: jose.JWK
}> {
  const { publicKey, privateKey } = await jose.generateKeyPair('RS256', {
    extractable: true,
    modulusLength: 2048,
  })
  const [publicJWK, privateJWK] = await Promise.all([
    jose.exportJWK(publicKey),
    jose.exportJWK(privateKey),
  ])
  return {
    publicJWK,
    privateJWK,
  }
}
