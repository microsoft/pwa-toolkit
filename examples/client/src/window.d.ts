/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
interface Cookie {
  name: string
  value: string
  domain: string
  path: string
  expires: DOMTimeStamp
  secure: boolean
  sameSite: 'strict' | 'lax' | 'none'
}

interface WorkerGlobalScope {
  __WB_DISABLE_DEV_LOGS: boolean
}

interface Window {
  cookieStore: {
    delete: (
      nameOrOptions: string | { name: string; url?: string; path?: string },
    ) => Promise<undefined>
    get: (
      nameOrOptions: string | { name: string; url: string },
    ) => Promise<Cookie | null>
    getAll: (
      nameOrOptions: string | { name: string; url: string },
    ) => Promise<Cookie[]>
    set: (
      nameOrOptions:
        | string
        | {
            name: string
            value: string
            domain?: string
            path?: string
            expires?: DOMTimeStamp
            secure?: boolean
            sameSite?: 'strict' | 'lax' | 'none'
          },
      value?: string,
    ) => Promise<undefined>
  }
}
