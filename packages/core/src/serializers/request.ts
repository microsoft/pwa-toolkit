import { flattenRecord } from '../utilities/flattenRecord.js'

export async function serializeRequestBody(
  request: Request,
  prettyPrint: boolean = false,
): Promise<string> {
  const clone = request.clone()
  const text = await clone.text()
  try {
    const bodyRecord = JSON.parse(text) as Record<string, unknown>
    const flattenObj = flattenRecord(bodyRecord)

    return JSON.stringify(
      Object.keys(flattenObj)
        .sort()
        .reduce<Record<string, unknown>>((acc, cur) => {
          acc[cur] = flattenObj[cur]
          return acc
        }, {}),
      undefined,
      prettyPrint ? 2 : undefined,
    )
  } catch (ex) {
    return text
  }
}

export async function serializeRequest(
  request: Request,
  prettyPrint: boolean = false,
): Promise<string> {
  const body = await serializeRequestBody(request, prettyPrint)
  return JSON.stringify(
    {
      url: request.url,
      method: request.method,
      headers: request.headers,
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
