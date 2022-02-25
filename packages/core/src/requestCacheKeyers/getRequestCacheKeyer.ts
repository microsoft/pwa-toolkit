import { RequestCacheKeyer } from '../types.js'

export const getRequestCacheKeyer: RequestCacheKeyer = async (
  request: Request,
) => {
  return request.url
}
