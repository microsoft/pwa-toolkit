/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { isRecord } from './isRecord.js'

export function flattenRecord(
  record: Record<string, unknown>,
): Record<string, string | number> {
  const output: Record<string, string | number> = {}

  function step(obj: Record<string, unknown> | unknown[], prev?: string): void {
    Object.entries(obj).forEach(([key, value]) => {
      const fullKey = prev != null ? `${prev}.${key}` : key
      if (isStrOrNum(value)) {
        output[fullKey] = value
      } else if (isRecord(value) || Array.isArray(value)) {
        step(value, fullKey)
      }
    })
  }

  step(record)

  return output
}

function isStrOrNum(value: unknown): value is string | number {
  return typeof value === 'string' || typeof value === 'number'
}
