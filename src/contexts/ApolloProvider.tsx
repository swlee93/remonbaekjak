import React from 'react'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

interface ApolloProviderInterface {
  children: JSX.Element
}

export default ({ children }: ApolloProviderInterface) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
