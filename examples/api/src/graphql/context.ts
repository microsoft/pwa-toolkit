/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { PrismaClient } from '@prisma/client'

// import type { ExternalUser } from '../types'

export interface DataSources {
  prisma: PrismaClient
}
export interface Context {
  // user?: ExternalUser
  // authError?: Error
  dataSources: DataSources
}
