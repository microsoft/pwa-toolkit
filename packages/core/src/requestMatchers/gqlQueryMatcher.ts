import { RequestMatcher } from '../types.js'
import { isRecord } from '../utilities/isRecord.js'

export const gqlQueryMatcher: RequestMatcher = async function gqlQueryMatcher(
  request,
) {
  try {
    const clone = request.clone()
    const body = await clone.json()
    return (
      isRecord(body) &&
      body.query != null &&
      typeof body.query === 'string' &&
      /^\s*query/i.test(body.query)
    )
  } catch (ex) {
    return false
  }
}
