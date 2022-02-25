import { clientsClaim } from 'workbox-core'

import { log, setVersion } from '../utilities/logger.js'

declare let self: ServiceWorkerGlobalScope

export interface RegisterOptions {
  skipWaiting?: boolean
  claimClient?: boolean
  serviceWorkerVersion?: string
}

export function register(options: RegisterOptions = {}): void {
  const {
    skipWaiting = true,
    claimClient = true,
    serviceWorkerVersion = new Date().toISOString(),
  } = options
  setVersion(serviceWorkerVersion)
  self.addEventListener('install', () => {
    log(`Installing. Service worker waiting for activation`)
    if (skipWaiting) {
      log(`Skip waiting`)
      self.skipWaiting()
    }
  })
  self.addEventListener('activate', () => {
    if (claimClient) {
      log(`Claim client.`)
    }
    log(`Activating`)
  })
  if (claimClient) {
    clientsClaim()
  }
}
