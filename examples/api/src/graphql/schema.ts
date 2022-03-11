/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { makeSchema } from 'nexus'
import { resolve } from 'path'

import * as types from './schema/index'

export const schema = makeSchema({
  types,
  outputs: {
    schema: resolve(__dirname, './schema.graphql'),
    typegen: resolve(__dirname, './types.ts'),
  },
  contextType: {
    module: resolve(__dirname, './context.ts'),
    export: 'Context',
  },
  prettierConfig: require.resolve('../../../../.prettierrc'),
})
