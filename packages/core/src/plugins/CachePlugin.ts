import type * as WB from 'workbox-core'

import type { Expand } from '../utilities/expandType.js'

export type Test = Expand<WB.WorkboxPlugin>

export type MapLikeObject = Expand<Record<string, any>>

export type HandlerWillStartCallbackParam = Expand<
  Omit<WB.HandlerWillStartCallbackParam, 'state'> & { state?: MapLikeObject }
>
export type HandlerWillStartCallback = (
  param: HandlerWillStartCallbackParam,
) => Promise<void | null | undefined>

export type HandlerWillRespondCallbackParam = Expand<
  Omit<WB.HandlerWillRespondCallbackParam, 'state'> & { state?: MapLikeObject }
>
export type HandlerWillRespondCallback = (
  param: HandlerWillRespondCallbackParam,
) => Promise<Response>

export type HandlerDidRespondCallbackParam = Expand<
  Omit<WB.HandlerDidRespondCallbackParam, 'state'> & { state?: MapLikeObject }
>
export type HandlerDidRespondCallback = (
  param: HandlerDidRespondCallbackParam,
) => Promise<void | null | undefined>

export type HandlerDidCompleteCallbackParam = Expand<
  Omit<WB.HandlerDidCompleteCallbackParam, 'state'> & { state?: MapLikeObject }
>
export type HandlerDidCompleteCallback = (
  param: HandlerDidCompleteCallbackParam,
) => Promise<void | null | undefined>

export type HandlerDidErrorCallbackParam = Expand<
  Omit<WB.HandlerDidErrorCallbackParam, 'state'> & { state?: MapLikeObject }
>
export type HandlerDidErrorCallback = (
  param: HandlerDidErrorCallbackParam,
) => Promise<Response | undefined>

export type CacheWillUpdateCallbackParam = Expand<
  Omit<WB.CacheWillUpdateCallbackParam, 'state'> & { state?: MapLikeObject }
>
export type CacheWillUpdateCallback = (
  param: CacheWillUpdateCallbackParam,
) => Promise<Response | void | null | undefined>

export type CacheDidUpdateCallbackParam = Expand<
  Omit<WB.CacheDidUpdateCallbackParam, 'state'> & { state?: MapLikeObject }
>
export type CacheDidUpdateCallback = (
  param: CacheDidUpdateCallbackParam,
) => Promise<void | null | undefined>

export type CacheKeyWillBeUsedCallbackParam = Expand<
  Omit<WB.CacheKeyWillBeUsedCallbackParam, 'state'> & { state?: MapLikeObject }
>
export type CacheKeyWillBeUsedCallback = (
  param: CacheKeyWillBeUsedCallbackParam,
) => Promise<Request | string>

export type CachedResponseWillBeUsedCallbackParam = Expand<
  Omit<WB.CachedResponseWillBeUsedCallbackParam, 'state'> & {
    state?: MapLikeObject
  }
>
export type CachedResponseWillBeUsedCallback = (
  param: CachedResponseWillBeUsedCallbackParam,
) => Promise<Response | void | null | undefined>

export type RequestWillFetchCallbackParam = Expand<
  Omit<WB.RequestWillFetchCallbackParam, 'state'> & {
    state?: MapLikeObject
  }
>
export type RequestWillFetchCallback = (
  param: RequestWillFetchCallbackParam,
) => Promise<Request>

export type FetchDidFailCallbackParam = Expand<
  Omit<WB.FetchDidFailCallbackParam, 'state'> & {
    state?: MapLikeObject
  }
>
export type FetchDidFailCallback = (
  param: FetchDidFailCallbackParam,
) => Promise<void | null | undefined>

export type FetchDidSucceedCallbackParam = Expand<
  Omit<WB.FetchDidSucceedCallbackParam, 'state'> & {
    state?: MapLikeObject
  }
>
export type FetchDidSucceedCallback = (
  param: FetchDidSucceedCallbackParam,
) => Promise<Response>

export interface CachePlugin {
  handlerWillStart?: HandlerWillStartCallback
  handlerWillRespond?: HandlerWillRespondCallback
  handlerDidRespond?: HandlerDidRespondCallback
  handlerDidComplete?: HandlerDidCompleteCallback
  handlerDidError?: HandlerDidErrorCallback
  cacheWillUpdate?: CacheWillUpdateCallback
  cacheDidUpdate?: CacheDidUpdateCallback
  cacheKeyWillBeUsed?: CacheKeyWillBeUsedCallback
  cachedResponseWillBeUsed?: CachedResponseWillBeUsedCallback
  requestWillFetch?: RequestWillFetchCallback
  fetchDidFail?: FetchDidFailCallback
  fetchDidSucceed?: FetchDidSucceedCallback
}
