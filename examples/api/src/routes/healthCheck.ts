import { FastifyPluginAsync } from 'fastify'

export const healthCheck: FastifyPluginAsync = async (fastify, options) => {
  fastify.route({
    method: 'GET',
    url: '/health-check',
    handler: async (request, reply) => {
      return { online: true }
    },
  })
}
