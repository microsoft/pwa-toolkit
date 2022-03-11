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
        app.publicKey = app.certificate.publicKey
        delete app.certificate
        // const today = new Date()
        // return await reply.expires(add(today, { days: 1 })).send({ data: app })

        // return { data: app }
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
