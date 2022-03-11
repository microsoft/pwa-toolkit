/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { serializeResponse } from '../serializers/response.js'
import { RequestCacheKeyer } from '../types.js'
import { time, timestamp } from '../utilities/dates.js'
import { GroupMessage, log } from '../utilities/logger.js'
import {
  CacheDidUpdateCallback,
  CacheDidUpdateCallbackParam,
  CachedResponseWillBeUsedCallback,
  CachedResponseWillBeUsedCallbackParam,
  CacheKeyWillBeUsedCallback,
  CacheKeyWillBeUsedCallbackParam,
  CachePlugin,
  CacheWillUpdateCallback,
  CacheWillUpdateCallbackParam,
  FetchDidFailCallback,
  FetchDidFailCallbackParam,
  FetchDidSucceedCallback,
  FetchDidSucceedCallbackParam,
  HandlerDidCompleteCallback,
  HandlerDidCompleteCallbackParam,
  HandlerDidErrorCallback,
  HandlerDidErrorCallbackParam,
  HandlerDidRespondCallback,
  HandlerDidRespondCallbackParam,
  HandlerWillRespondCallback,
  HandlerWillRespondCallbackParam,
  HandlerWillStartCallback,
  HandlerWillStartCallbackParam,
  MapLikeObject,
  RequestWillFetchCallback,
  RequestWillFetchCallbackParam,
} from './CachePlugin.js'

export type BaseCachePluginOptions = {
  pluginName?: string
  requestCacheKeyer?: RequestCacheKeyer
}
export class BaseCachePlugin implements CachePlugin {
  private declare readonly requestCacheKeyer: RequestCacheKeyer | undefined
  private declare readonly pluginName: string

  constructor(options: BaseCachePluginOptions = {}) {
    this.requestCacheKeyer = options.requestCacheKeyer
    this.pluginName = options.pluginName ?? 'BaseCachePlugin'

    this.handlerWillStart.bind(this)
    this.handlerWillRespond.bind(this)
    this.handlerDidRespond.bind(this)
    this.handlerDidComplete.bind(this)
    this.handlerDidError.bind(this)
    this.cacheWillUpdate.bind(this)
    this.cacheDidUpdate.bind(this)
    this.cacheKeyWillBeUsed.bind(this)
    this.cachedResponseWillBeUsed.bind(this)
    this.requestWillFetch.bind(this)
    this.fetchDidFail.bind(this)
    this.fetchDidSucceed.bind(this)
  }

  public async handlerWillStart({
    request,
    state,
  }: HandlerWillStartCallbackParam): ReturnType<HandlerWillStartCallback> {
    state = state ?? {}
    populateState(state)
    state.id = `${Math.floor(Math.random() * 1000000)}`
    state.request = request.clone()
    state.timestamp = timestamp()
    state.messages.push(`${time()} handlerWillStart`)
  }

  public async handlerWillRespond({
    response,
    state,
  }: HandlerWillRespondCallbackParam): ReturnType<HandlerWillRespondCallback> {
    state = state ?? {}
    populateState(state)
    state.response = response.clone()
    state.messages.push(`${time()} handlerWillRespond`)
    return response
  }

  public async handlerDidRespond({
    state,
    response,
  }: HandlerDidRespondCallbackParam): ReturnType<HandlerDidRespondCallback> {
    state = state ?? {}
    populateState(state)

    if (response != null) {
      const serializedResponse = await serializeResponse(
        state.response.clone(),
        true,
      )
      state.messages.push({
        label: `${time()} handerDidRespond`,
        messages: [serializedResponse],
      } as GroupMessage)
    } else {
      state.messages.push(`${time()} handlerDidRespond`)
    }
  }

  public async handlerDidComplete({
    state,
  }: HandlerDidCompleteCallbackParam): ReturnType<HandlerDidCompleteCallback> {
    state = state ?? {}
    populateState(state)
    state.messages.push(`${time()} handlerDidComplete`)
    log({
      label: `${this.pluginName} - request ${
        (state.cacheKey != null ? state.cacheKey : state.request.url) as string
      }`,
      messages: state.messages,
    } as GroupMessage)
  }

  public async handlerDidError({
    state,
  }: HandlerDidErrorCallbackParam): ReturnType<HandlerDidErrorCallback> {
    state = state ?? {}
    populateState(state)
    state.messages.push(`${time()} handlerDidError`)
    return undefined
  }

  public async cacheWillUpdate({
    state,
    response,
  }: CacheWillUpdateCallbackParam): ReturnType<CacheWillUpdateCallback> {
    state = state ?? {}
    populateState(state)
    state.messages.push(`${time()} cacheWillUpdate`)
    return response
  }

  public async cacheDidUpdate({
    state,
  }: CacheDidUpdateCallbackParam): ReturnType<CacheDidUpdateCallback> {
    state = state ?? {}
    populateState(state)
    state.messages.push(`${time()} cacheDidUpdate`)
  }

  public async cacheKeyWillBeUsed({
    state,
    request,
  }: CacheKeyWillBeUsedCallbackParam): ReturnType<CacheKeyWillBeUsedCallback> {
    state = state ?? {}
    populateState(state)

    state.cacheKey =
      this.requestCacheKeyer != null
        ? await this.requestCacheKeyer(state.request.clone())
        : request.url

    state.messages.push(
      `${time()} cacheKeyWillBeUsed - ${state.cacheKey as string}`,
    )
    return state.cacheKey
  }

  public async cachedResponseWillBeUsed({
    state,
    cachedResponse,
  }: CachedResponseWillBeUsedCallbackParam): ReturnType<CachedResponseWillBeUsedCallback> {
    state = state ?? {}
    populateState(state)
    state.response = cachedResponse?.clone()
    state.messages.push(`${time()} cachedResponseWillBeUsed`)
    return cachedResponse
  }

  public async requestWillFetch({
    state,
    request,
  }: RequestWillFetchCallbackParam): ReturnType<RequestWillFetchCallback> {
    state = state ?? {}
    populateState(state)
    state.messages.push(`${time()} requestWillFetch`)
    return request
  }

  public async fetchDidFail({
    state,
  }: FetchDidFailCallbackParam): ReturnType<FetchDidFailCallback> {
    state = state ?? {}
    populateState(state)
    state.messages.push(`${time()} fetchDidFail`)
  }

  public async fetchDidSucceed({
    state,
    response,
  }: FetchDidSucceedCallbackParam): ReturnType<FetchDidSucceedCallback> {
    state = state ?? {}
    populateState(state)
    state.messages.push(`${time()} fetchDidSucceed`)
    return response
  }
}

function populateState(state?: MapLikeObject): void {
  state = state ?? {}
  state.id = state.id ?? ''
  state.messages = state.messages ?? []
}
