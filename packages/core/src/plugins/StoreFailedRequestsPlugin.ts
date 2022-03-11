/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { serializeRequest } from '../serializers/request.js'
import { IndexedDBStore } from '../stores/IndexedDBStore.js'
import { RequestMatcher } from '../types.js'
import { Expand } from '../utilities/expandType.js'
import { BaseCachePlugin, BaseCachePluginOptions } from './BaseCachePlugin.js'
import {
  CacheWillUpdateCallback,
  CacheWillUpdateCallbackParam,
  FetchDidFailCallback,
  FetchDidFailCallbackParam,
} from './CachePlugin.js'

export type StoreFailedRequestsPluginOptions = Expand<
  Omit<BaseCachePluginOptions, 'pluginName'> & {
    requestMatcher?: RequestMatcher
    indexedDBName?: string
    indexedDBTable?: string
  }
>

export class StoreFailedRequestsPlugin extends BaseCachePlugin {
  private declare readonly requestMatcher: RequestMatcher | undefined
  private declare readonly indexedDBName: string
  private declare readonly indexedDBTable: string
  private declare readonly store: IndexedDBStore

  constructor(options: StoreFailedRequestsPluginOptions = {}) {
    super({
      pluginName: 'StoreFailedRequestsPlugin',
      ...options,
    })
    this.requestMatcher = options.requestMatcher
    this.indexedDBName = options.indexedDBName ?? 'PWA-Toolkit'
    this.indexedDBTable = options.indexedDBTable ?? 'Offline requests'
    this.store = new IndexedDBStore({
      dbName: this.indexedDBName,
      tableName: this.indexedDBTable,
    })
  }

  public override async fetchDidFail(
    params: FetchDidFailCallbackParam,
  ): ReturnType<FetchDidFailCallback> {
    const { state = {} } = params
    await super.fetchDidFail(params)
    if (
      this.requestMatcher != null &&
      (await this.requestMatcher(state.request.clone()))
    ) {
      const serializedRequest = await serializeRequest(state.request.clone())
      await this.store.set(state.timestamp, serializedRequest)
    }
  }

  public async cacheWillUpdate(
    params: CacheWillUpdateCallbackParam,
  ): ReturnType<CacheWillUpdateCallback> {
    const { state = {} } = params
    if (
      this.requestMatcher != null &&
      (await this.requestMatcher(state.request.clone()))
    ) {
      return null
    } else {
      const response = await super.cacheWillUpdate(params)
      return response
    }
  }
}
