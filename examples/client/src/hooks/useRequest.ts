/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { RequestDocument, Variables } from 'graphql-request'
import { GraphQLError, GraphQLResponse } from 'graphql-request/dist/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { gqlClient } from '../lib/gqlClient'

export function useRequest<T = any, V = Variables>(
  document: RequestDocument,
  variables?: V,
  requestHeaders?: Headers | string[][] | Record<string, string>,
): [T | null, GraphQLError[]] {
  const [response, setResponse] = useState<T | null>(null)
  const [errors, setError] = useState<GraphQLError[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const makeRequest = async (): Promise<void> => {
      try {
        const res = await gqlClient.request<T>(
          document,
          variables,
          requestHeaders,
        )
        setResponse(res)
      } catch (ex: any) {
        // console.log(JSON.stringify(ex, undefined, 2))
        if (
          (ex.response as GraphQLResponse).errors![0].extensions?.code ===
          'UNAUTHENTICATED'
        ) {
          navigate('/login')
        } else {
          setError(ex.response.errors)
        }
      }
    }
    void makeRequest()
  }, [document, variables, requestHeaders, navigate])

  return [response, errors]
}
