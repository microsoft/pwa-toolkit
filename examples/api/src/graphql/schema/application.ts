/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { objectType } from 'nexus'

export const Application = objectType({
  name: 'Application',
  definition(t) {
    t.id('id', { description: 'UUID of the Application' })
    t.string('name', { description: 'Application display name' })
    // t.field('publicKey', {
    //   type: 'JWK',
    // })
  },
})
