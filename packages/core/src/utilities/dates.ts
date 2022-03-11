/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export function timestamp(): string {
  return new Date().toISOString()
}

export function time(): string {
  const date = new Date()
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
}
