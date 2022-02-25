import { objectType } from 'nexus'

export const Application = objectType({
  name: 'Application',
  definition(t) {
    t.id('id', { description: 'UUID of the Application' })
    t.string('name', { description: 'Application display name' })
    t.field('publicKey', {
      type: 'JWK',
    })
  },
})
