/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { IndexedDbRequestSerializer } from '../types.js'

export async function serializeRequestBody(request: Request): Promise<string> {
  const clone = request.clone()
  return await clone.text()
}

export const serializeRequest: IndexedDbRequestSerializer =
  async function serializeRequest(request: Request): Promise<string> {
    const body = await serializeRequestBody(request)
    const headers: Record<string, string> = {}
    for (const [key, value] of request.headers) {
      headers[key] = value
    }
    return JSON.stringify({
      url: request.url,
      method: request.method,
      headers: headers,
      body,
      mode: request.mode,
      credentials: request.credentials,
      cache: request.cache,
      redirect: request.redirect,
      referrer: request.referrer,
    })
  }
