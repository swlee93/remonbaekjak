import React from 'react'

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  HttpLink,
  InMemoryCache,
  split,
  concat,
  ApolloLink,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

enum THIRD_PARTY {
  GITHUB = 'GITHUB',
}

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const temp = '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'
  const authorization = `Bearer ${localStorage.getItem('token') || temp || null}`

  operation.setContext({
    headers: {
      authorization,
    },
  })

  return forward(operation)
})

const githubLink = concat(
  authMiddleware,
  new HttpLink({
    uri: 'https://api.github.com/graphql',
  }),
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  split(({ getContext }) => getContext()?.client === THIRD_PARTY.GITHUB, githubLink, httpLink),
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

interface ApolloProviderInterface {
  children: JSX.Element
}

const privider = ({ children }: ApolloProviderInterface) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export { privider as default, THIRD_PARTY }
