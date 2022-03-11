/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { IndexedDBStore } from '@pwa-toolkit/indexeddb-store'

import { IndexedDbRequestDeserializer } from '../types.js'
import { Expand } from '../utilities/expandType.js'

export type ReplayRequestsOptions = {
  fetcher?: Fetcher
  deserializer?: IndexedDbRequestDeserializer
}

export type ReplayOfflineRequestsOptions = Expand<
  ReplayRequestsOptions & {
    indexedDBName?: string
    indexedDBTable?: string
  }
>

export type Fetcher = (request: Request) => Promise<Response>

export class ReplayOfflineRequests {
  private declare readonly dbName: string
  private declare readonly tableName: string
  private declare readonly store: IndexedDBStore
  private declare readonly fetcher: Fetcher
  private declare readonly deserializer: IndexedDbRequestDeserializer

  constructor(options: ReplayOfflineRequestsOptions = {}) {
    const {
      indexedDBName = 'PWA-Toolkit',
      indexedDBTable = 'Offline requests',
      fetcher,
      deserializer,
    } = options
    this.dbName = indexedDBName
    this.tableName = indexedDBTable
    this.store = new IndexedDBStore({
      dbName: indexedDBName,
      tableName: indexedDBTable,
    })
    this.fetcher = fetcher ?? window.fetch
    this.deserializer =
      deserializer ??
      ((record) => {
        const value = JSON.parse(record as string)
        return new Request(value.url, value)
      })
  }

  public async *replayRequests(
    options: ReplayRequestsOptions = {},
  ): AsyncGenerator<Response, void, void> {
    const { fetcher = this.fetcher, deserializer = this.deserializer } = options
    for await (const [key, serializedRequest] of this.store.entries()) {
      const response = await fetcher(deserializer(serializedRequest))
      yield response
      await this.store.delete(key)
    }
  }
}
