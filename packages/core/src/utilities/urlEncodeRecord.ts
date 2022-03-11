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
