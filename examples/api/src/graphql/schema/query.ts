/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
// import { AuthenticationError, ForbiddenError } from 'apollo-server-core'
import { nonNull, queryType, stringArg } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.nonNull.field('application', {
      type: 'Application',
      async resolve(source, args, { dataSources }) {
        const application: any =
          (await dataSources.prisma.application.findFirst())!
        // application.publicKey = application.certificate.publicKey
        // delete application.certificate
        return application
      },
    })

    t.nonNull.list.nonNull.field('notes', {
      type: 'Note',
      async resolve(source, args, { dataSources /*, user, authError */ }) {
        // if (user == null) {
        //   throw new AuthenticationError('Unauthenticated')
        // }
        return await dataSources.prisma.note.findMany({
          // where: {
          //   authorId: user.id,
          // },
          orderBy: {
            title: 'asc',
          },
        }) // as Array<NexusGenRootTypes['Note']>
      },
    })

    t.field('note', {
      type: 'Note',
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(source, args, { dataSources /*, user, authError */ }) {
        // if (user == null) {
        //   throw new AuthenticationError('Unauthenticated')
        // }
        const note = await dataSources.prisma.note.findUnique({
          where: {
            id: args.id,
          },
        })
        // if (note === null) {
        //   return note
        // }
        // if (user.id !== note.authorId) {
        //   throw new ForbiddenError('Unauthorized')
        // }
        return note
      },
    })
  },
})
