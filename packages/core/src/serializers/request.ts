export async function serializeRequestBody(request: Request): Promise<string> {
  const clone = request.clone()
  return await clone.text()
}

export async function serializeRequest(
  request: Request,
  prettyPrint: boolean = false,
): Promise<string> {
  const body = await serializeRequestBody(request)
  const headers: Record<string, string> = {}
  for (const [key, value] of request.headers) {
    headers[key] = value
  }
  return JSON.stringify(
    {
      url: request.url,
      method: request.method,
      headers: headers,
      body,
      mode: request.mode,
      credentials: request.credentials,
      cache: request.cache,
      redirect: request.redirect,
      referrer: request.referrer,
    },
    undefined,
    prettyPrint ? 2 : undefined,
  )
}
