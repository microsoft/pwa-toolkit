/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import deepmerge from 'deepmerge'
import type { VitePWAOptions } from 'vite-plugin-pwa'

export function vitePWAConfig(
  config: Partial<VitePWAOptions> = {},
): Partial<VitePWAOptions> {
  const defaultConfig: Partial<VitePWAOptions> = {
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.ts',
    registerType: 'autoUpdate',
    useCredentials: true,
    injectRegister: 'inline',
    injectManifest: {
      globDirectory: 'dist',
      globPatterns: [
        'favicon.svg',
        'robots.txt',
        '**/*.{html,js,css,png,jpg,jpeg,gif,webp,svg}',
      ],
    },
    manifest: {
      name: 'PWA Starter',
      short_name: 'PWA',
      description: 'PWA Starter App',
      theme_color: '#0078d4',
      icons: [
        {
          src: 'icons/icon_24.png',
          sizes: '24x24',
          type: 'image/png',
        },
        {
          src: 'icons/icon_48.png',
          sizes: '48x48',
          type: 'image/png',
        },
        {
          src: 'icons/icon_192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/icon_512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'icons/icon_512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  }

  return deepmerge(defaultConfig, config, {
    arrayMerge: (_, source) => source,
  })
}
