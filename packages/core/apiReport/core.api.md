## API Report File for "@pwa-toolkit/core"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { PrecacheEntry } from 'workbox-precaching';
import type { StrategyOptions } from 'workbox-strategies';
import type * as WB from 'workbox-core';

// Warning: (ae-missing-release-tag) "BaseCachePlugin" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export class BaseCachePlugin implements CachePlugin {
    constructor(options?: BaseCachePluginOptions);
    // (undocumented)
    cacheDidUpdate({ state, }: CacheDidUpdateCallbackParam): ReturnType<CacheDidUpdateCallback>;
    // (undocumented)
    cachedResponseWillBeUsed({ state, cachedResponse, }: CachedResponseWillBeUsedCallbackParam): ReturnType<CachedResponseWillBeUsedCallback>;
    // (undocumented)
    cacheKeyWillBeUsed({ state, request, }: CacheKeyWillBeUsedCallbackParam): ReturnType<CacheKeyWillBeUsedCallback>;
    // (undocumented)
    cacheWillUpdate({ state, response, }: CacheWillUpdateCallbackParam): ReturnType<CacheWillUpdateCallback>;
    // (undocumented)
    fetchDidFail({ state, }: FetchDidFailCallbackParam): ReturnType<FetchDidFailCallback>;
    // (undocumented)
    fetchDidSucceed({ state, response, }: FetchDidSucceedCallbackParam): ReturnType<FetchDidSucceedCallback>;
    // (undocumented)
    handlerDidComplete({ state, }: HandlerDidCompleteCallbackParam): ReturnType<HandlerDidCompleteCallback>;
    // (undocumented)
    handlerDidError({ state, }: HandlerDidErrorCallbackParam): ReturnType<HandlerDidErrorCallback>;
    // (undocumented)
    handlerDidRespond({ state, response, }: HandlerDidRespondCallbackParam): ReturnType<HandlerDidRespondCallback>;
    // (undocumented)
    handlerWillRespond({ response, state, }: HandlerWillRespondCallbackParam): ReturnType<HandlerWillRespondCallback>;
    // (undocumented)
    handlerWillStart({ request, state, }: HandlerWillStartCallbackParam): ReturnType<HandlerWillStartCallback>;
    // (undocumented)
    requestWillFetch({ state, request, }: RequestWillFetchCallbackParam): ReturnType<RequestWillFetchCallback>;
}

// Warning: (ae-missing-release-tag) "BaseCachePluginOptions" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type BaseCachePluginOptions = {
    pluginName?: string;
    requestCacheKeyer?: RequestCacheKeyer;
};

// Warning: (ae-missing-release-tag) "CacheDidUpdateCallback" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type CacheDidUpdateCallback = (param: CacheDidUpdateCallbackParam) => Promise<void | null | undefined>;

// Warning: (ae-forgotten-export) The symbol "Expand" needs to be exported by the entry point index.d.ts
// Warning: (ae-missing-release-tag) "CacheDidUpdateCallbackParam" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type CacheDidUpdateCallbackParam = Expand<Omit<WB.CacheDidUpdateCallbackParam, 'state'> & {
    state?: MapLikeObject;
}>;

// Warning: (ae-missing-release-tag) "CachedResponseWillBeUsedCallback" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type CachedResponseWillBeUsedCallback = (param: CachedResponseWillBeUsedCallbackParam) => Promise<Response | void | null | undefined>;

// Warning: (ae-missing-release-tag) "CachedResponseWillBeUsedCallbackParam" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type CachedResponseWillBeUsedCallbackParam = Expand<Omit<WB.CachedResponseWillBeUsedCallbackParam, 'state'> & {
    state?: MapLikeObject;
}>;

// Warning: (ae-missing-release-tag) "CacheKeyWillBeUsedCallback" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type CacheKeyWillBeUsedCallback = (param: CacheKeyWillBeUsedCallbackParam) => Promise<Request | string>;

// Warning: (ae-missing-release-tag) "CacheKeyWillBeUsedCallbackParam" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type CacheKeyWillBeUsedCallbackParam = Expand<Omit<WB.CacheKeyWillBeUsedCallbackParam, 'state'> & {
    state?: MapLikeObject;
}>;

// Warning: (ae-missing-release-tag) "CachePlugin" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface CachePlugin {
    // (undocumented)
    cacheDidUpdate?: CacheDidUpdateCallback;
    // (undocumented)
    cachedResponseWillBeUsed?: CachedResponseWillBeUsedCallback;
    // (undocumented)
    cacheKeyWillBeUsed?: CacheKeyWillBeUsedCallback;
    // (undocumented)
    cacheWillUpdate?: CacheWillUpdateCallback;
    // (undocumented)
    fetchDidFail?: FetchDidFailCallback;
    // (undocumented)
    fetchDidSucceed?: FetchDidSucceedCallback;
    // (undocumented)
    handlerDidComplete?: HandlerDidCompleteCallback;
    // (undocumented)
    handlerDidError?: HandlerDidErrorCallback;
    // (undocumented)
    handlerDidRespond?: HandlerDidRespondCallback;
    // (undocumented)
    handlerWillRespond?: HandlerWillRespondCallback;
    // (undocumented)
    handlerWillStart?: HandlerWillStartCallback;
    // (undocumented)
    requestWillFetch?: RequestWillFetchCallback;
}

// Warning: (ae-missing-release-tag) "CachePostRequestPlugin" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export class CachePostRequestPlugin extends BaseCachePlugin {
    constructor(options?: CachePostRequestPluginOptions);
    // (undocumented)
    cacheWillUpdate(params: CacheWillUpdateCallbackParam): ReturnType<CacheWillUpdateCallback>;
}

// Warning: (ae-missing-release-tag) "CachePostRequestPluginOptions" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type CachePostRequestPluginOptions = Expand<Omit<BaseCachePluginOptions, 'pluginName'> & {
    requestMatcher?: RequestMatcher;
}>;

// Warning: (ae-missing-release-tag) "cacheRequests" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export function cacheRequests({ cacheName, cacheStrategy, method, routes, plugins, }: CacheRequestsOptions): void;

// Warning: (ae-missing-release-tag) "CacheRequestsOptions" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type CacheRequestsOptions = {
    cacheStrategy: CacheStrategy;
    routes: Array<string | RegExp | RequestMatcherSync>;
    cacheName: string;
    plugins?: CachePlugin[];
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'HEAD';
};

// Warning: (ae-missing-release-tag) "CacheStrategy" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type CacheStrategy = 'CacheOnly' | 'CacheFirst' | 'NetworkFirst' | 'NetworkOnly' | 'StaleWhileRevalidate';

// Warning: (ae-missing-release-tag) "CacheStrategyOptions" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type CacheStrategyOptions = Expand<Omit<StrategyOptions, 'fetchOptions' | 'matchOptions' | 'plugins'> & {
    plugins?: CachePlugin[];
}>;

// Warning: (ae-missing-release-tag) "CacheWillUpdateCallback" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type CacheWillUpdateCallback = (param: CacheWillUpdateCallbackParam) => Promise<Response | void | null | undefined>;

// Warning: (ae-missing-release-tag) "CacheWillUpdateCallbackParam" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type CacheWillUpdateCallbackParam = Expand<Omit<WB.CacheWillUpdateCallbackParam, 'state'> & {
    state?: MapLikeObject;
}>;

// Warning: (ae-missing-release-tag) "enableSpaRouting" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export function enableSpaRouting(fallbackPage?: string): void;

// Warning: (ae-missing-release-tag) "FetchDidFailCallback" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type FetchDidFailCallback = (param: FetchDidFailCallbackParam) => Promise<void | null | undefined>;

// Warning: (ae-missing-release-tag) "FetchDidFailCallbackParam" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type FetchDidFailCallbackParam = Expand<Omit<WB.FetchDidFailCallbackParam, 'state'> & {
    state?: MapLikeObject;
}>;

// Warning: (ae-missing-release-tag) "FetchDidSucceedCallback" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type FetchDidSucceedCallback = (param: FetchDidSucceedCallbackParam) => Promise<Response>;

// Warning: (ae-missing-release-tag) "FetchDidSucceedCallbackParam" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type FetchDidSucceedCallbackParam = Expand<Omit<WB.FetchDidSucceedCallbackParam, 'state'> & {
    state?: MapLikeObject;
}>;

// Warning: (ae-missing-release-tag) "Fetcher" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type Fetcher = (request: Request) => Promise<Response>;

// Warning: (ae-missing-release-tag) "getRequestCacheKeyer" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export const getRequestCacheKeyer: RequestCacheKeyer;

// Warning: (ae-missing-release-tag) "gqlMutationMatcher" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export const gqlMutationMatcher: RequestMatcher;

// Warning: (ae-missing-release-tag) "gqlQueryMatcher" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export const gqlQueryMatcher: RequestMatcher;

// Warning: (ae-missing-release-tag) "HandlerDidCompleteCallback" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type HandlerDidCompleteCallback = (param: HandlerDidCompleteCallbackParam) => Promise<void | null | undefined>;

// Warning: (ae-missing-release-tag) "HandlerDidCompleteCallbackParam" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type HandlerDidCompleteCallbackParam = Expand<Omit<WB.HandlerDidCompleteCallbackParam, 'state'> & {
    state?: MapLikeObject;
}>;

// Warning: (ae-missing-release-tag) "HandlerDidErrorCallback" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type HandlerDidErrorCallback = (param: HandlerDidErrorCallbackParam) => Promise<Response | undefined>;

// Warning: (ae-missing-release-tag) "HandlerDidErrorCallbackParam" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type HandlerDidErrorCallbackParam = Expand<Omit<WB.HandlerDidErrorCallbackParam, 'state'> & {
    state?: MapLikeObject;
}>;

// Warning: (ae-missing-release-tag) "HandlerDidRespondCallback" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type HandlerDidRespondCallback = (param: HandlerDidRespondCallbackParam) => Promise<void | null | undefined>;

// Warning: (ae-missing-release-tag) "HandlerDidRespondCallbackParam" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type HandlerDidRespondCallbackParam = Expand<Omit<WB.HandlerDidRespondCallbackParam, 'state'> & {
    state?: MapLikeObject;
}>;

// Warning: (ae-missing-release-tag) "HandlerWillRespondCallback" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type HandlerWillRespondCallback = (param: HandlerWillRespondCallbackParam) => Promise<Response>;

// Warning: (ae-missing-release-tag) "HandlerWillRespondCallbackParam" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type HandlerWillRespondCallbackParam = Expand<Omit<WB.HandlerWillRespondCallbackParam, 'state'> & {
    state?: MapLikeObject;
}>;

// Warning: (ae-missing-release-tag) "HandlerWillStartCallback" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type HandlerWillStartCallback = (param: HandlerWillStartCallbackParam) => Promise<void | null | undefined>;

// Warning: (ae-missing-release-tag) "HandlerWillStartCallbackParam" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type HandlerWillStartCallbackParam = Expand<Omit<WB.HandlerWillStartCallbackParam, 'state'> & {
    state?: MapLikeObject;
}>;

// Warning: (ae-missing-release-tag) "IndexedDbRequestDeserializer" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type IndexedDbRequestDeserializer = (indexedDbRecord: unknown) => Request;

// Warning: (ae-missing-release-tag) "IndexedDbRequestSerializer" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type IndexedDbRequestSerializer = (indexedDbRecord: Request) => Promise<unknown>;

// Warning: (ae-missing-release-tag) "MapLikeObject" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type MapLikeObject = Expand<Record<string, any>>;

// Warning: (ae-missing-release-tag) "postRequestCacheKeyer" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export const postRequestCacheKeyer: RequestCacheKeyer;

// Warning: (ae-missing-release-tag) "precacheStaticAssets" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export function precacheStaticAssets({ assets, cacheName, cleanupOutdatedCaches: cleanup, }: PrecacheStaticAssetsOptions): void;

// Warning: (ae-missing-release-tag) "PrecacheStaticAssetsOptions" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface PrecacheStaticAssetsOptions {
    // (undocumented)
    assets: Array<string | PrecacheEntry>;
    // (undocumented)
    cacheName: string;
    // (undocumented)
    cleanupOutdatedCaches?: boolean;
}

// Warning: (ae-missing-release-tag) "register" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export function register(options?: RegisterOptions): void;

// Warning: (ae-missing-release-tag) "RegisterOptions" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export interface RegisterOptions {
    // (undocumented)
    claimClient?: boolean;
    // (undocumented)
    serviceWorkerVersion?: string;
    // (undocumented)
    skipWaiting?: boolean;
}

// Warning: (ae-missing-release-tag) "ReplayOfflineRequests" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export class ReplayOfflineRequests {
    constructor(options?: ReplayOfflineRequestsOptions);
    // (undocumented)
    replayRequests(options?: ReplayRequestsOptions): AsyncGenerator<Response, void, void>;
}

// Warning: (ae-missing-release-tag) "ReplayOfflineRequestsOptions" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type ReplayOfflineRequestsOptions = Expand<ReplayRequestsOptions & {
    indexedDBName?: string;
    indexedDBTable?: string;
}>;

// Warning: (ae-missing-release-tag) "ReplayRequestsOptions" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type ReplayRequestsOptions = {
    fetcher?: Fetcher;
    deserializer?: IndexedDbRequestDeserializer;
};

// Warning: (ae-missing-release-tag) "RequestCacheKeyer" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type RequestCacheKeyer = (request: Request) => Promise<string>;

// Warning: (ae-missing-release-tag) "RequestMatcher" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type RequestMatcher = (request: Request) => Promise<boolean>;

// Warning: (ae-missing-release-tag) "RequestMatcherSync" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type RequestMatcherSync = (request: Request) => boolean;

// Warning: (ae-missing-release-tag) "RequestWillFetchCallback" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type RequestWillFetchCallback = (param: RequestWillFetchCallbackParam) => Promise<Request>;

// Warning: (ae-missing-release-tag) "RequestWillFetchCallbackParam" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type RequestWillFetchCallbackParam = Expand<Omit<WB.RequestWillFetchCallbackParam, 'state'> & {
    state?: MapLikeObject;
}>;

// Warning: (ae-missing-release-tag) "serializeRequest" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export const serializeRequest: IndexedDbRequestSerializer;

// Warning: (ae-missing-release-tag) "serializeRequestBody" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export function serializeRequestBody(request: Request): Promise<string>;

// Warning: (ae-missing-release-tag) "serializeResponse" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export function serializeResponse(response: Response, prettyPrint?: boolean): Promise<string>;

// Warning: (ae-missing-release-tag) "StoreFailedRequestsPlugin" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export class StoreFailedRequestsPlugin extends BaseCachePlugin {
    constructor(options?: StoreFailedRequestsPluginOptions);
    // (undocumented)
    cacheWillUpdate(params: CacheWillUpdateCallbackParam): ReturnType<CacheWillUpdateCallback>;
    // (undocumented)
    fetchDidFail(params: FetchDidFailCallbackParam): ReturnType<FetchDidFailCallback>;
}

// Warning: (ae-missing-release-tag) "StoreFailedRequestsPluginOptions" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type StoreFailedRequestsPluginOptions = Expand<Omit<BaseCachePluginOptions, 'pluginName'> & {
    requestMatcher?: RequestMatcher;
    indexedDBName?: string;
    indexedDBTable?: string;
    requestSerializer?: IndexedDbRequestSerializer;
}>;

// Warning: (ae-missing-release-tag) "Test" is exported by the package, but it is missing a release tag (@alpha, @beta, @public, or @internal)
//
// @public (undocumented)
export type Test = Expand<WB.WorkboxPlugin>;

// (No @packageDocumentation comment for this package)

```
