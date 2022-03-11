/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { RequestCacheKeyer } from '../types.js'

export const getRequestCacheKeyer: RequestCacheKeyer = async (
  request: Request,
) => {
  return request.url
}
