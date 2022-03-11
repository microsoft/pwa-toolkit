/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FastifyPluginAsync } from 'fastify'

import { application } from './application'
import { authenticate } from './authenticate'
import { hello } from './hello'

export const api: FastifyPluginAsync = async (fastify, options) => {
  void fastify.register(hello)
  void fastify.register(application)
  void fastify.register(authenticate)
}
