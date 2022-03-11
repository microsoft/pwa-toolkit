/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { objectType } from 'nexus'

export const JWK = objectType({
  name: 'JWK',
  definition(t) {
    t.nullable.string('alg', { description: 'JWK algorithm.' })
    t.nullable.string('crv')
    t.nullable.string('d')
    t.nullable.string('dp')
    t.nullable.string('dq')
    t.nullable.string('e')
    t.nullable.string('ext')
    t.nullable.string('k')
    t.nullable.string('kid')
    t.nullable.string('kty')
    t.nullable.string('n')
    t.nullable.string('p')
    t.nullable.string('q')
    t.nullable.string('qi')
    t.nullable.string('use')
    t.nullable.string('x')
    t.nullable.string('x5t256')
    t.nullable.string('x5u')
    t.nullable.string('y')
    t.nullable.string('key_ops')
  },
})
