export async function serializeResponse(
  response: Response,
  prettyPrint: boolean = false,
): Promise<string> {
  const body = await response.clone().text()
  return JSON.stringify(
    {
      url: response.url,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      type: response.type,
      body: body,
    },
    undefined,
    prettyPrint ? 2 : undefined,
  )
}
