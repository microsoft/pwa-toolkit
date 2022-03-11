import { useContext } from 'react'

import { NetworkCheckContext } from './context'
import { NetworkCheckContextType } from './types'

export function useNetworkCheckContext(): NetworkCheckContextType {
  return useContext(NetworkCheckContext)
}
