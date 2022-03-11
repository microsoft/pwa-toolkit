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
