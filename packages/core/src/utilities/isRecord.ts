export function isRecord(obj: unknown): obj is Record<string, unknown> {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    obj.constructor === Object &&
    Object.prototype.toString.call(obj) === '[object Object]'
  )
}
