/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { randomBytes, scrypt as s, timingSafeEqual } from 'crypto'
import { promisify } from 'util'

const scrypt = promisify(s)

export async function hash(password: string): Promise<string> {
  const salt = randomBytes(16).toString('base64')

  const derivedKey = (await scrypt(password, salt, 64)) as Buffer
  return `${salt}:${derivedKey.toString('base64')}`
}

export async function verify(password: string, hash: string): Promise<boolean> {
  const [salt, key] = hash.split(':')
  const buffer = Buffer.from(key, 'base64')
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer
  return timingSafeEqual(buffer, derivedKey)
}

// hash('password')
//   .then(async (hash) => {
//     console.log(hash)
//     return await verify('password', hash)
//   })
//   .then((bool) => {
//     console.log(bool)
//   })
//   .catch((ex) => {
//     console.log(ex)
//   })
