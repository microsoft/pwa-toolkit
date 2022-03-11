/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FastifyPluginAsync } from 'fastify'

export const application: FastifyPluginAsync = async (fastify, options) => {
  fastify.route({
    method: 'GET',
    url: '/application',
    handler: async (request, reply) => {
      const app: any = await fastify.prisma.application.findFirst()
      if (app !== null) {
        // app.publicKey = app.certificate.publicKey
        // delete app.certificate

        return await reply
          .cacheControl({
            cache: 'private',
            maxAge: 60 * 60 * 24,
          })
          .send({ data: app })
      }
      return await reply.status(404).send('Not found.')
    },
  })
}
