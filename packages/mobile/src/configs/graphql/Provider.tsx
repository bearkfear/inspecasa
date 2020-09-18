import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from './index'
export const Provider: React.FC<{}> = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)
