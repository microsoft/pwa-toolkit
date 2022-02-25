import type { PrismaClient } from '@prisma/client'

import type { ExternalUser } from '../types'

export interface DataSources {
  prisma: PrismaClient
}
export interface Context {
  user?: ExternalUser
  authError?: Error
  dataSources: DataSources
}
