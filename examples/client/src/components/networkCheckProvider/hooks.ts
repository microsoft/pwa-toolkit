/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useContext } from 'react'

import { NetworkCheckContext } from './context'
import { NetworkCheckContextType } from './types'

export function useNetworkCheckContext(): NetworkCheckContextType {
  return useContext(NetworkCheckContext)
}
