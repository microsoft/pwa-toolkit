/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FastifyPluginAsync } from 'fastify'

import { api } from './api'
import { healthCheck } from './healthCheck'

export const routes: FastifyPluginAsync = async (fastify, options) => {
  void fastify.register(api)
  void fastify.register(healthCheck)
}
