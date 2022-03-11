import { RequestCacheKeyer } from '../types.js'
import { urlEncodeRecord } from '../utilities/urlEncodeRecord.js'

export const postRequestCacheKeyer: RequestCacheKeyer = async (
  request: Request,
) => {
  const req = request.clone()
  const bodyText = await req.text()
  try {
    const body = JSON.parse(bodyText)
    const urlEncodedBody = urlEncodeRecord(body)
    return `${request.url.replace(/\/$/g, '')}${urlEncodedBody}`
  } catch (ex) {
    return `${request.url.replace(/\/$/g, '')}${
      bodyText !== '' ? '?' + bodyText : ''
    }`
  }
}
