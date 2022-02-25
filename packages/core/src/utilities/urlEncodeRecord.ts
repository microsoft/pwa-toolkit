import { flattenRecord } from './flattenRecord.js'

export function urlEncodeRecord(record: Record<string, unknown>): string {
  const flattenObj = flattenRecord(record)

  return encodeURI(
    Object.entries(flattenObj)
      .reduce((acc, [key, value]) => {
        acc += `${acc === '' ? '?' : '&'}${key}=${value}`
        return acc
      }, '')
      .replace(/\s+/g, ' '),
  )
}
