export type NetworkState = {
  online: boolean
}

export type SetNetworkState = (networkState: NetworkState) => void
export type NetworkChecker = () => Promise<boolean>

export type NetworkCheckContextType = {
  networkState: NetworkState
  setNetworkState: SetNetworkState
  isNetworkOnline: NetworkChecker
}
