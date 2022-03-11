import { IDBPDatabase, openDB } from 'idb'

export type IndexedDBStoreOptions = {
  dbName: string
  tableName: string
}

export class IndexedDBStore {
  private declare readonly dbName: string
  private declare readonly tableName: string
  private declare readonly dbPromise: Promise<IDBPDatabase<unknown>>

  constructor({ dbName, tableName }: IndexedDBStoreOptions) {
    this.dbName = dbName
    this.tableName = tableName
    this.dbPromise = openDB(dbName, 1, {
      upgrade(db) {
        db.createObjectStore(tableName)
      },
    })
    this.values = this.values.bind(this)
    this.entries = this.entries.bind(this)
  }

  public get = async (key: string): Promise<string | undefined> => {
    return await (await this.dbPromise).get(this.tableName, key)
  }

  public set = async (key: string, value: string): Promise<void> => {
    await (await this.dbPromise).put(this.tableName, value, key)
  }

  public delete = async (key: string): Promise<void> => {
    await (await this.dbPromise).delete(this.tableName, key)
  }

  public clear = async (): Promise<void> => {
    await (await this.dbPromise).clear(this.tableName)
  }

  public keys = async (): Promise<string[]> => {
    return (await (await this.dbPromise).getAllKeys(this.tableName)) as string[]
  }

  public async *values(): AsyncGenerator<string, void, void> {
    const keys = [...(await this.keys())]
    for (const key of keys) {
      const val = await this.get(key)
      if (val !== undefined) {
        yield val
      }
    }
  }

  public async *entries(): AsyncGenerator<[string, string], void, void> {
    const keys = [...(await this.keys())]
    for (const key of keys) {
      const val = await this.get(key)
      if (val !== undefined) {
        yield [key, val]
      }
    }
  }
}
