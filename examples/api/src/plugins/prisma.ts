import type { PrismaClient } from '@prisma/client'
import type { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
export interface PrismaPluginOptions {
  prisma: PrismaClient
}

export const prismaPlugin: FastifyPluginAsync<PrismaPluginOptions> = fp(
  async (app, options) => {
    app.decorate('prisma', options.prisma)
    app.addHook('onClose', (instance, done) => {
      instance.prisma.$disconnect().finally(() => {
        done()
      })
    })
  },
)
