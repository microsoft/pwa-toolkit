/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { /* Static, */ Type } from '@sinclair/typebox'
// import { FastifyPluginAsync } from 'fastify'
// import * as jose from 'jose'

// import { verify } from '../lib/password'
// import type { Certificate /* ExternalUser */ } from '../types'

export const AuthenticatePostSchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
})
// type AuthenticatePost = Static<typeof AuthenticatePostSchema>

// export const authenticate: FastifyPluginAsync = async (fastify, options) => {
//   fastify.route<{ Body: AuthenticatePost }>({
//     method: 'POST',
//     url: '/authenticate',
//     schema: {
//       body: AuthenticatePostSchema,
//     },
//     handler: async (request, reply) => {
//       const { email, password } = request.body
//       const user = await fastify.prisma.user.findUnique({
//         where: {
//           email: email,
//         },
//       })
//       if (user == null) {
//         return await reply.status(401).send('Unauthenticated')
//       }
//       const isValidPassword = await verify(password, user.password)
//       if (!isValidPassword) {
//         return await reply.status(401).send('Unauthenticated')
//       }
//       const externalUser: ExternalUser = user
//       // @ts-expect-error
//       delete externalUser.password
//       const app = await fastify.prisma.application.findUnique({
//         where: {
//           name: process.env.APP_NAME,
//         },
//       })
//       if (app == null) {
//         throw new Error(
//           `Unable to load application settings for ${
//             process.env.APP_NAME ?? ''
//           }`,
//         )
//       }
//       if (
//         app.certificate == null ||
//         (app.certificate as any).publicKey == null ||
//         (app.certificate as any).privateKey == null
//       ) {
//         throw new Error(
//           `${process.env
//             .APP_NAME!} does not have a certificate for JWT signing!`,
//         )
//       }
//       const { privateKey } = app.certificate as unknown as Certificate
//       const rsaPrivateKey = await jose.importJWK(
//         privateKey,
//         process.env.JWT_SIGNING_ALG ?? 'RS256',
//       )

//       const jwt = await new jose.SignJWT(externalUser)
//         .setProtectedHeader({
//           alg: process.env.JWT_SIGNING_ALG ?? 'RS256',
//         })
//         .setIssuedAt()
//         .setIssuer(process.env.JWT_ISSUER!)
//         .setAudience(process.env.JWT_AUDIENCE!)
//         .setExpirationTime(process.env.JWT_EXPIRATION!)
//         .sign(rsaPrivateKey)

//       return await reply
//         .setCookie('access_token', jwt, {
//           // domain: '.localhost',
//           path: '/',
//           httpOnly: false,
//           sameSite: 'none',
//           secure: true,
//           signed: false,
//         })
//         .send({ access_token: jwt })
//     },
//   })
// }
