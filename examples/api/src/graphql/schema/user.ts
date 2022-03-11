/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id', { description: 'UUID of the User' })
    t.nonNull.string('email', { description: 'Unique user email' })
    t.string('name', { description: 'optional user display name' })
    // t.field('hmacSigningKey', {
    //   type: 'JWK',
    // })
  },
})
