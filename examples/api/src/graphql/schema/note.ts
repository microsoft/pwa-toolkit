import { FieldResolver, objectType } from 'nexus'

export const Note = objectType({
  name: 'Note',
  sourceType: {
    module: '@prisma/client',
    export: 'Note',
  },
  definition(t) {
    t.id('id', { description: 'UUID of the Note' })
    t.nonNull.string('title', { description: 'Unique Note title' })
    t.string('content', { description: 'Note contents' })
    t.nonNull.field('author', {
      type: 'User',
      async resolve(parent, args, { dataSources, user }) {
        return (await dataSources.prisma.user.findUnique({
          where: {
            id: parent.authorId,
          },
        })) as ReturnType<FieldResolver<'Note', 'Author'>>
      },
    })
  },
})
