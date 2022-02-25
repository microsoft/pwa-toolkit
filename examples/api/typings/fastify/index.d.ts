import 'fastify'

import type { PrismaClient } from '@prisma/client'
import { CookieSerializeOptions } from 'fastify-cookie'

// import type Node from 'redisgraph.js/types/src/node'
// import { OpErrorOptions, REPLY_ERROR_CODE } from '../../src/plugins/opError'
// import { OpFlowOptions } from '../../src/plugins/opFlow'
// import { OPSession } from '../../src/types'

declare module 'fastify' {
  // interface Session {
  //   [key: string]: OPSession
  // }
  // interface FastifyInstance {
  //   prisma: PrismaClient
  // }
  // interface FastifyRequest {
  //   org: Node
  // }
  // interface FastifyReply {
  //   opError: (opts: OpErrorOptions) => FastifyReply
  //   opFlow: (opts: OpFlowOptions) => FastifyReply
  // }
  interface FastifyInstance {
    prisma: PrismaClient
    /**
     * Unsigns the specified cookie using the secret provided.
     * @param value Cookie value
     */
    unsignCookie: (value: string) => {
      valid: boolean
      renew: boolean
      value: string | null
    }
    /**
     * Manual cookie parsing method
     * @docs https://github.com/fastify/fastify-cookie#manual-cookie-parsing
     * @param cookieHeader Raw cookie header value
     */
    parseCookie: (cookieHeader: string) => {
      [key: string]: string
    }
  }
  interface FastifyRequest {
    /**
     * Request cookies
     */
    cookies: { [cookieName: string]: string }
    /**
     * Unsigns the specified cookie using the secret provided.
     * @param value Cookie value
     */
    unsignCookie: (value: string) => {
      valid: boolean
      renew: boolean
      value: string | null
    }
  }
  type setCookieWrapper = (
    name: string,
    value: string,
    options?: CookieSerializeOptions,
  ) => FastifyReply
  interface FastifyReply {
    /**
     * Set response cookie
     * @name setCookie
     * @param name Cookie name
     * @param value Cookie value
     * @param options Serialize options
     */
    setCookie: setCookieWrapper
    /**
     * @alias setCookie
     */
    cookie: setCookieWrapper
    /**
     * clear response cookie
     * @param name Cookie name
     * @param options Serialize options
     */
    clearCookie: (
      name: string,
      options?: CookieSerializeOptions,
    ) => FastifyReply
    /**
     * Unsigns the specified cookie using the secret provided.
     * @param value Cookie value
     */
    unsignCookie: (value: string) => {
      valid: boolean
      renew: boolean
      value: string | null
    }
    cacheControlOptions: CacheControlOptions
    cacheControl: (options: CacheControlOptions) => FastifyReply
  }

  interface CacheControlOptions {
    cache?: false | 'no-cache' | 'public' | 'private'
    mustRevalidate?: boolean
    maxAge?: number | string
  }
}
