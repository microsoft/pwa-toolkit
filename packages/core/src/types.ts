/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { StrategyOptions as SO } from 'workbox-strategies'

import { CachePlugin } from './plugins/CachePlugin.js'
import type { Expand } from './utilities/expandType.js'

export type CacheStrategy =
  | 'CacheOnly'
  | 'CacheFirst'
  | 'NetworkFirst'
  | 'NetworkOnly'
  | 'StaleWhileRevalidate'

export type CacheStrategyOptions = Expand<
  Omit<SO, 'fetchOptions' | 'matchOptions' | 'plugins'> & {
    plugins?: CachePlugin[]
  }
>

export type CacheRequestsOptions = {
  cacheStrategy: CacheStrategy
  routes: Array<string | RegExp | RequestMatcherSync>
  cacheName: string
  plugins?: CachePlugin[]
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'HEAD'
}

export type RequestMatcher = (request: Request) => Promise<boolean>
export type RequestMatcherSync = (request: Request) => boolean
export type RequestCacheKeyer = (request: Request) => Promise<string>

export type IndexedDbRequestSerializer = (
  indexedDbRecord: Request,
) => Promise<unknown>
export type IndexedDbRequestDeserializer = (indexedDbRecord: unknown) => Request

declare global {
  interface ServiceWorkerGlobalScope {
    __ENABLE_PWA_TOOLKIT_LOGGING: boolean
  }
}
