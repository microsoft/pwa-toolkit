import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

import { base64ToBase64url, base64urlToBase64 } from './base64url'

const ALGO = 'aes-128-gcm'

export function encrypt(text: string): string {
  const key = process.env.AES_128_GCM_SECRET_KEY
  if (key == null) {
    throw new Error(
      'environment variable AES_128_GCM_SECRET_KEY must be set for encrypting and decrypting.',
    )
  }
  const iv = randomBytes(12)
  const cipher = createCipheriv(ALGO, Buffer.from(key, 'base64'), iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return [
    encrypted.toString('base64'),
    iv.toString('base64'),
    cipher.getAuthTag().toString('base64'),
  ]
    .map(base64ToBase64url)
    .join('.')
}

export function decrypt(cypherText: string): string {
  const key = process.env.AES_128_GCM_SECRET_KEY
  if (key == null) {
    throw new Error(
      'environment variable AES_128_GCM_SECRET_KEY must be set for encrypting and decrypting.',
    )
  }
  const [encrypted, iv, authTag] = cypherText.split('.').map(base64urlToBase64)
  const decipher = createDecipheriv(
    ALGO,
    Buffer.from(key, 'base64'),
    Buffer.from(iv, 'base64'),
  )
  decipher.setAuthTag(Buffer.from(authTag, 'base64'))
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted, 'base64')),
    decipher.final(),
  ])
  return decrypted.toString()
}
