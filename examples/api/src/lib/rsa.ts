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
