import { serializeRequestBody } from '../serializers/request.js'
import { RequestCacheKeyer } from '../types.js'
import { urlEncodeRecord } from '../utilities/urlEncodeRecord.js'

export const postRequestCacheKeyer: RequestCacheKeyer = async (
  request: Request,
) => {
  try {
    const body = await serializeRequestBody(request)
    const urlEncodedBody = urlEncodeRecord(JSON.parse(body))
    return `${request.url.replace(/\/$/g, '')}${urlEncodedBody}`
  } catch (ex) {
    return request.url
  }
}
