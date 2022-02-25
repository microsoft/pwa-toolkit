import type { User } from '@prisma/client'
import * as jose from 'jose'

export interface App {
  name: string
  publicJWK: jose.JWK
  privateJWK: jose.JWK
}
export type ExternalUser = Omit<User, 'password'>
export interface InternalUser extends User {}
export interface Certificate {
  publicKey: jose.JWK
  privateKey: jose.JWK
}
