/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FastifyPluginAsync } from 'fastify'

export const hello: FastifyPluginAsync = async (fastify, options) => {
  fastify.route({
    method: 'GET',
    url: '/hello',
    handler: async (request, reply) => {
      return { hello: 'world' }
    },
  })
}
