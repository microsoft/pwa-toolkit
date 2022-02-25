import type * as fastify from 'fastify'
// import type * as fastify from 'fastify'
import fp from 'fastify-plugin'
export interface CacheControlPluginOptions
  extends Partial<fastify.CacheControlOptions> {}

const cacheControlPlugin: fastify.FastifyPluginAsync<CacheControlPluginOptions> =
  fp(async (app, options = {}) => {
    app.addHook('onRequest', async (request, reply) => {
      reply.cacheControlOptions = options
    })
    app.decorateReply(
      'cacheControl',
      function (
        this: fastify.FastifyReply,
        cache: fastify.CacheControlOptions,
      ) {
        this.cacheControlOptions = {
          ...(this.cacheControlOptions ?? {}),
          ...cache,
        }
        return this
      },
    )
    app.addHook('onSend', async (request, reply) => {
      let cacheHeader = 'no-store'
      if (typeof reply.cacheControlOptions.cache === 'string') {
        cacheHeader = reply.cacheControlOptions.cache
        if (reply.cacheControlOptions.maxAge != null) {
          cacheHeader +=
            ', max-age=' + reply.cacheControlOptions.maxAge.toString()
        }
        if (reply.cacheControlOptions.mustRevalidate === true) {
          cacheHeader += ', must-revalidate'
        }
      }
      await reply.header('Cache-Control', cacheHeader)
    })
  })

export default cacheControlPlugin
