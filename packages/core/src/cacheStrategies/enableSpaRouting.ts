/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createHandlerBoundToURL } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

export function enableSpaRouting(fallbackPage: string = '/index.html'): void {
  registerRoute(new NavigationRoute(createHandlerBoundToURL(fallbackPage)))
}
