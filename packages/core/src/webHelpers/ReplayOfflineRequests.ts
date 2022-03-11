/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IndexedDBStore } from '@pwa-toolkit/indexeddb-store'

import { log } from '../utilities/logger.js'

export type ReplayOfflineRequestsOptions = {
  indexedDBName: string
  indexedDBTable: string
  fetcher?: typeof fetch
}

export class ReplayOfflineRequests {
  private declare readonly dbName: string
  private declare readonly tableName: string
  private declare readonly store: IndexedDBStore
  private declare readonly fetch: typeof fetch

  constructor({
    indexedDBName,
    indexedDBTable,
    fetcher,
  }: ReplayOfflineRequestsOptions) {
    this.dbName = indexedDBName
    this.tableName = indexedDBTable
    this.store = new IndexedDBStore({
      dbName: indexedDBName,
      tableName: indexedDBTable,
    })
    this.fetch = fetcher ?? window.fetch
  }

  public async *replayRequests(
    fetcher: typeof fetch = this.fetch,
  ): AsyncGenerator<Response, void, void> {
    for await (const [
      timestamp,
      serializedRequest,
    ] of this.store.entries<string>()) {
      const requestObj = JSON.parse(serializedRequest)
      log(`Replaying request at ${timestamp} for ${serializedRequest}`)
      const request = new Request(requestObj.url, requestObj)
      const response = await fetcher(request)
      await this.store.delete(timestamp)
      yield response
    }
  }
}
