/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import '../config'

import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
