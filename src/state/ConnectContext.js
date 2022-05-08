import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../helpers/connector'

const ConnectContext = React.createContext({
  isConnected: false,
  chainId: 0,
  connect: () => {},
  disconnect: () => {},
  library: null,
  account: null,
})

export const ConnectProvider = ({ children }) => {
  const {
    activate,
    deactivate,
    active,
    chainId,
    library,
    account,
  } = useWeb3React()

  const connect = async () => {
    try {
      await activate(injected)
    } catch (error) {
      console.error(error)
    }
  }

  const disconnect = async () => {
    try {
      await deactivate()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ConnectContext.Provider
      value={{
        isConnected: active,
        chainId,
        connect,
        disconnect,
        library,
        account,
      }}
    >
      {children}
    </ConnectContext.Provider>
  )
}
