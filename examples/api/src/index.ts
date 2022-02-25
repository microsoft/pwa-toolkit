import './config'

import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-fastify'
import { ApolloServerPlugin } from 'apollo-server-plugin-base'
import fastify, { FastifyInstance } from 'fastify'
import fastifyCookie from 'fastify-cookie'
import cors from 'fastify-cors'

import { prisma } from './datastores/prisma'
import { schema } from './graphql/schema'
import { verifyAuthToken } from './lib/jwt'
import cacheControlPlugin from './plugins/cacheControl'
import { prismaPlugin } from './plugins/prisma'
import { api } from './routes/index'
import { Certificate, ExternalUser } from './types'

function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close()
        },
      }
    },
  }
}

function isUser(user: any): user is ExternalUser {
  return (
    typeof user?.id === 'string' &&
    typeof user?.email === 'string' &&
    user?.hmacSigningKey != null
  )
}

async function start(): Promise<void> {
  const app = fastify({ logger: true })

  const server = new ApolloServer({
    schema,
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
    dataSources: (): any => ({ prisma }),
    context: async ({ request, reply }) => {
      const authToken = (request.headers.authorization ?? '').split(' ')[1]
      if (authToken != null) {
        const application = (await prisma.application.findFirst())!
        const userOrError = await verifyAuthToken(
          authToken,
          (application.certificate as unknown as Certificate).publicKey,
        )
        if (isUser(userOrError)) {
          return { user: userOrError }
        } else {
          return { authError: userOrError }
        }
      }
    },
  })

  try {
    await server.start()
    void app.register(cacheControlPlugin, {
      cache: false,
      mustRevalidate: false,
    })
    void app.register(cors, {
      origin: true,
      methods: 'OPTIONS,GET,POST,PUT,PATCH,DELETE',
      credentials: true,
    })
    void app.register(fastifyCookie)
    void app.register(server.createHandler({ cors: false }), { prefix: '/api' })
    void app.register(prismaPlugin, { prisma })
    void app.register(api, { prefix: '/api' })
    await app.listen(process.env.PORT ?? 3000)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

void start()
