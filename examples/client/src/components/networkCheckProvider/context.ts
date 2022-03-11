/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createContext } from 'react'

import { NetworkCheckContextType } from './types'

export const networkCheckDefaultContext: NetworkCheckContextType = {
  networkState: {
    online: true,
  },
  setNetworkState: () => {},
  isNetworkOnline: async () => true,
}

export const NetworkCheckContext = createContext<NetworkCheckContextType>(
  networkCheckDefaultContext,
)
NetworkCheckContext.displayName = 'NetworkCheckContext'
