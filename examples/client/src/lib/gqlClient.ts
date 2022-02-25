import { GraphQLClient, RequestDocument, Variables } from 'graphql-request'

import { config } from '../config'
import { TokenProvider } from '../types'
import { tokenProvider } from './auth'

class GQLClient extends GraphQLClient {
  declare tokenProvider: TokenProvider<any>

  public setTokenProvider(tokenProvider: TokenProvider<any>): this {
    this.tokenProvider = tokenProvider
    return this
  }

  override async request<T = any, V = Variables>(
    document: RequestDocument,
    variables?: V,
    requestHeaders?: Headers | string[][] | Record<string, string>,
  ): Promise<T> {
    const reqHeaders = Array.isArray(requestHeaders)
      ? Object.fromEntries(requestHeaders)
      : {}

    const headers = new Headers(reqHeaders)

    try {
      const tokenData = await this.tokenProvider()
      headers.set('Authorization', `Bearer ${tokenData?.token ?? ''}`)
    } catch (ex) {}

    return await super.request(document, variables, headers)
  }
}

export const gqlClient = new GQLClient(config.graphqlApi, {
  credentials: 'include',
  mode: 'cors',
})

gqlClient.setTokenProvider(tokenProvider)
