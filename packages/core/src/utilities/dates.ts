export function timestamp(): string {
  return new Date().toISOString()
}

export function time(): string {
  const date = new Date()
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`
}
