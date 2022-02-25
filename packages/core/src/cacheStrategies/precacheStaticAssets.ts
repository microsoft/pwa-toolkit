import { setCacheNameDetails } from 'workbox-core'
import {
  cleanupOutdatedCaches,
  precacheAndRoute,
  PrecacheEntry,
} from 'workbox-precaching'

import { log } from '../utilities/logger.js'

declare let self: ServiceWorkerGlobalScope

export interface PrecacheStaticAssetsOptions {
  assets: Array<string | PrecacheEntry>
  cacheName: string
  cleanupOutdatedCaches?: boolean
}

export function precacheStaticAssets({
  assets,
  cacheName,
  cleanupOutdatedCaches: cleanup = true,
}: PrecacheStaticAssetsOptions): void {
  setCacheNameDetails({
    precache: cacheName,
    prefix: '',
    suffix: '',
    runtime: 'PWA-Toolkit - Runtime Requests',
  })
  if (cleanup) {
    self.addEventListener('activate', () => {
      log(`Cleaning up outdated caches.`)
    })
    cleanupOutdatedCaches()
  }
  self.addEventListener('install', () => {
    log(`Precaching assets`)
  })
  precacheAndRoute(assets)
}
