import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id', { description: 'UUID of the User' })
    t.nonNull.string('email', { description: 'Unique user email' })
    t.string('name', { description: 'optional user display name' })
    t.field('hmacSigningKey', {
      type: 'JWK',
    })
  },
})
