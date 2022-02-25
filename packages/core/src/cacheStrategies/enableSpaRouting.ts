import { createHandlerBoundToURL } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

export function enableSpaRouting(fallbackPage: string = '/index.html'): void {
  registerRoute(new NavigationRoute(createHandlerBoundToURL(fallbackPage)))
}
