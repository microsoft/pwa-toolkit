/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FastifyPluginAsync } from 'fastify'

import { application } from './application'
import { hello } from './hello'

export const api: FastifyPluginAsync = async (fastify, options) => {
  void fastify.register(hello, { prefix: 'api' })
  void fastify.register(application, { prefix: 'api' })
}
