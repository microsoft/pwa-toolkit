/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { flattenRecord } from './flattenRecord.js'

export function urlEncodeRecord(record: Record<string, unknown>): string {
  const flattenObj = flattenRecord(record)

  return encodeURI(
    Object.keys(flattenObj)
      .sort()
      .reduce((acc, key) => {
        acc += `${acc === '' ? '?' : '&'}${key}=${flattenObj[key]}`
        return acc
      }, ''),
  )
}
