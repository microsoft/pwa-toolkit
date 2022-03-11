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

  constructor({ indexedDBName, indexedDBTable }: ReplayOfflineRequestsOptions) {
    this.dbName = indexedDBName
    this.tableName = indexedDBTable
    this.store = new IndexedDBStore({
      dbName: indexedDBName,
      tableName: indexedDBTable,
    })
  }

  public async *replayRequests(): AsyncGenerator<Response, void, void> {}
}
