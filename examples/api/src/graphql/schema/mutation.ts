/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
  /* AuthenticationError,
  ForbiddenError, */
  UserInputError,
} from 'apollo-server-core'
import { mutationType, nonNull, stringArg } from 'nexus'

export const Mutation = mutationType({
  definition(t) {
    t.nonNull.field('createNote', {
      type: 'Note',
      args: {
        title: nonNull(stringArg()),
        content: stringArg(),
      },
      async resolve(parent, args, { dataSources /*, user */ }) {
        // if (user == null) {
        //   throw new AuthenticationError('Unauthenticated')
        // }
        return await dataSources.prisma.note.create({
          data: {
            ...args,
            // authorId: user.id,
          },
        })
      },
    })

    t.nonNull.field('editNote', {
      type: 'Note',
      args: {
        title: nonNull(stringArg()),
        content: stringArg(),
      },
      async resolve(parent, args, { dataSources /*, user */ }) {
        // if (user == null) {
        //   throw new AuthenticationError('Unauthenticated')
        // }
        const note = await dataSources.prisma.note.findUnique({
          where: {
            title: args.title,
          },
        })
        if (note === null) {
          throw new UserInputError(`Note ${args.title} does not exist.`)
        }
        // if (user.id !== note.authorId) {
        //   throw new ForbiddenError('Unauthorized')
        // }
        return await dataSources.prisma.note.update({
          where: {
            title: args.title,
          },
          data: {
            content: args.content,
          },
        })
      },
    })
  },
})
