import { RequestMatcher } from '../types.js'
import { isRecord } from '../utilities/isRecord.js'

export const gqlMutationMatcher: RequestMatcher =
  async function gqlMutationMatcher(request) {
    try {
      const clone = request.clone()
      const body = await clone.json()
      return (
        isRecord(body) &&
        body.query != null &&
        typeof body.query === 'string' &&
        /^\s*mutation/i.test(body.query)
      )
    } catch (ex) {
      return false
    }
  }
