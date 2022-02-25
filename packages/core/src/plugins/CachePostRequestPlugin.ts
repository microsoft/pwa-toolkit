import { postRequestCacheKeyer } from '../requestCacheKeyers/postRequestCacheKeyer.js'
import { RequestMatcher } from '../types.js'
import { Expand } from '../utilities/expandType.js'
import { BaseCachePlugin, BaseCachePluginOptions } from './BaseCachePlugin.js'
import {
  CacheWillUpdateCallback,
  CacheWillUpdateCallbackParam,
} from './CachePlugin.js'

export type CachePostRequestPluginOptions = Expand<
  Omit<BaseCachePluginOptions, 'pluginName'> & {
    requestMatcher?: RequestMatcher
  }
>

export class CachePostRequestPlugin extends BaseCachePlugin {
  private declare readonly requestMatcher: RequestMatcher | undefined

  constructor(options: CachePostRequestPluginOptions = {}) {
    super({
      pluginName: 'CachePostRequestPlugin',
      requestCacheKeyer: postRequestCacheKeyer,
      ...options,
    })
    this.requestMatcher = options.requestMatcher
  }

  public async cacheWillUpdate(
    params: CacheWillUpdateCallbackParam,
  ): ReturnType<CacheWillUpdateCallback> {
    const { state = {} } = params
    if (
      this.requestMatcher != null &&
      !(await this.requestMatcher(state.request.clone()))
    ) {
      return null
    } else {
      const response = await super.cacheWillUpdate(params)
      return response
    }
  }
}
