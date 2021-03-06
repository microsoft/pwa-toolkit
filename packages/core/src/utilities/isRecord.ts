/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export function isRecord(obj: unknown): obj is Record<string, unknown> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    obj.constructor === Object &&
    Object.prototype.toString.call(obj) === '[object Object]'
  )
}
