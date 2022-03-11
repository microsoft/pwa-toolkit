import {
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { setAsyncInterval } from '../../lib/setAsyncInterval'
import { NetworkCheckContext, networkCheckDefaultContext } from './context'
import { NetworkState } from './types'

export interface NetworkCheckProviderProps {
  url: string | string[]
  interval?: number
}

export const NetworkCheckProvider: FC<
  PropsWithChildren<NetworkCheckProviderProps>
> = memo(function NetworkCheckProvider({
  url,
  interval = 0.5 * 60 * 1000,
  children,
}: PropsWithChildren<NetworkCheckProviderProps>) {
  const [networkState, setNetworkState] = useState<NetworkState>(
    networkCheckDefaultContext.networkState,
  )

  const urls = useMemo(() => {
    return Array.isArray(url) ? url : [url]
  }, [url])

  const isNetworkOnline = useCallback(async () => {
    try {
      for (const endpoint of urls) {
        await fetch(endpoint)
      }
      return true
    } catch (ex) {
      return false
    }
  }, [urls])

  const context = useMemo(() => {
    return {
      networkState,
      setNetworkState,
      isNetworkOnline,
    }
  }, [networkState, setNetworkState, isNetworkOnline])

  useEffect(() => {
    return setAsyncInterval(async () => {
      const isOnline = await isNetworkOnline()
      setNetworkState({
        online: isOnline,
      })
    }, interval)
  }, [isNetworkOnline, interval, setNetworkState])

  return (
    <NetworkCheckContext.Provider value={context}>
      {children}
    </NetworkCheckContext.Provider>
  )
})
