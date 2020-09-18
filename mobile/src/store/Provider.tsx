import React from 'react'
import { authStore } from './authStore'
import { StoreContext } from './context'
export const StoreProvider: React.FC<{}> = ({ children }) => {
  return (
    <StoreContext.Provider
      value={authStore}
    >
      {children}
    </StoreContext.Provider>)
}
