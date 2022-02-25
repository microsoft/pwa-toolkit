import type { RouteMatchCallback } from 'workbox-core'
import { registerRoute } from 'workbox-routing'

import { BaseCachePlugin } from '../plugins/BaseCachePlugin.js'
import { CachePostRequestPlugin } from '../plugins/CachePostRequestPlugin.js'
import { CacheRequestsOptions, RequestMatcherSync } from '../types.js'
import { CacheStrategyFactory } from './CacheStrategyFactory.js'

export function cacheRequests({
  cacheName,
  cacheStrategy,
  method = 'GET',
  routes,
  plugins,
}: CacheRequestsOptions): void {
  plugins =
    plugins ??
    (method === 'POST'
      ? [new CachePostRequestPlugin()]
      : [new BaseCachePlugin()])

  const strategy = CacheStrategyFactory.createStrategy(cacheStrategy, {
    cacheName,
    plugins,
  })

  for (const route of routes) {
    registerRoute(
      typeof route === 'function' ? wrapRequestMatcher(route) : route,
      strategy,
      method,
    )
  }
}

function wrapRequestMatcher(
  requestMatcher: RequestMatcherSync,
): RouteMatchCallback {
  return ({ request }) => requestMatcher(request)
}
