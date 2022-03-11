/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
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
