/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
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
