import {
  CachePostRequestPlugin,
  cacheRequests,
  enableSpaRouting,
  gqlMutationMatcher,
  gqlQueryMatcher,
  precacheStaticAssets,
  register,
  StoreFailedRequestsPlugin,
} from '@pwa-toolkit/core'

import { config } from './config'

declare let self: ServiceWorkerGlobalScope

/* eslint-disable */
declare const __BUILD_DATE: string
declare const __ENABLE_LOGGING: boolean
/* eslint-enable */

self.__ENABLE_PWA_TOOLKIT_LOGGING = __ENABLE_LOGGING ?? false

register({
  serviceWorkerVersion: __BUILD_DATE,
})

precacheStaticAssets({
  assets: self.__WB_MANIFEST,
  cacheName: 'Static Assets',
})

enableSpaRouting()

cacheRequests({
  cacheName: 'Runtime GET Requests',
  cacheStrategy: 'NetworkFirst',
  routes: [
    /https:\/\/spoppe-b\.azureedge\.net\/*/,
    new RegExp(`${config.restApi}/.*`),
  ],
})

cacheRequests({
  cacheName: 'GQL Requests',
  cacheStrategy: 'NetworkFirst',
  method: 'POST',
  routes: [config.graphqlApi],
  plugins: [
    new StoreFailedRequestsPlugin({
      requestMatcher: gqlMutationMatcher,
    }),
    new CachePostRequestPlugin({
      requestMatcher: gqlQueryMatcher,
    }),
  ],
})
