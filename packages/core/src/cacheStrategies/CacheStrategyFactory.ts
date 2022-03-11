/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
  CacheFirst,
  CacheOnly,
  NetworkFirst,
  NetworkOnly,
  StaleWhileRevalidate,
  Strategy,
} from 'workbox-strategies'

import { CacheStrategy, CacheStrategyOptions } from '../types.js'

export class CacheStrategyFactory {
  static createStrategy(
    strategy: CacheStrategy,
    options?: CacheStrategyOptions,
  ): Strategy {
    switch (strategy) {
      case 'CacheFirst':
        return new CacheFirst(options)
      case 'CacheOnly':
        return new CacheOnly(options)
      case 'NetworkFirst':
        return new NetworkFirst(options)
      case 'StaleWhileRevalidate':
        return new StaleWhileRevalidate(options)
      default:
        return new NetworkOnly(options)
    }
  }
}
