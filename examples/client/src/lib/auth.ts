import * as jose from 'jose'

import { config } from '../config'
import { TokenProvider } from '../types'

export const tokenProvider: TokenProvider<API.User> =
  async function tokenProvider() {
    const [cookie, jwk] = await Promise.all([
      window.cookieStore.get('access_token'),
      fetchApplicationCertificate(),
    ])
    if (cookie !== null) {
      const token = cookie.value
      const user = await parseAndVerifyAuthToken(token, jwk)
      return { token, payload: user }
    }
    return null
  }

const applicationCache: API.Application | null = null

async function fetchApplicationCertificate(): Promise<jose.JWK> {
  if (applicationCache !== null) {
    return applicationCache.publicKey! as jose.JWK
  }
  // const applicationQuery = gql`
  //   query Application {
  //     application {
  //       name
  //       publicKey {
  //         kty
  //         e
  //         n
  //       }
  //     }
  //   }
  // `
  // const { application } = await request<{
  //   application: API.Application
  // }>(endpoint, applicationQuery)
  const res = await fetch(`${config.restApi}/application`, {
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const { data }: { data: API.Application } = await res.json()
  // applicationCache = data
  return data.publicKey! as jose.JWK
}

const validTokenCache: Map<string, API.User> = new Map()

async function parseAndVerifyAuthToken(
  token: string,
  publicKey: jose.JWK,
): Promise<API.User> {
  const cacheKey = `${token}-${JSON.stringify(publicKey)}`
  if (validTokenCache.has(cacheKey)) {
    return validTokenCache.get(cacheKey)!
  }

  const key = await jose.importJWK(publicKey, 'RS256')
  // const { payload } = await jose.jwtVerify(token, key, {
  //   algorithms: ['RS256'],
  //   issuer: 'Notatki',
  //   audience: 'Notatki',
  // })
  // Only verify the signature.
  const { payload } = await jose.compactVerify(token, key)

  return JSON.parse(new TextDecoder().decode(payload)) as API.User
}
