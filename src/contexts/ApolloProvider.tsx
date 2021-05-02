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
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

import { AUTH_TOKEN } from 'contexts/UserProvider'

enum THIRD_PARTY {
  GITHUB = 'GITHUB',
}

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
})

export class ClientStorage {
  storageKey = 'client'
  storage: any
  constructor() {
    try {
      const __storage = localStorage.getItem(this.storageKey) || ''
      this.storage = JSON.parse(__storage) || {}
    } catch (err) {
      this.storage = {}
    }
  }
  get = (key: 'token') => {
    if (key) {
      return this.storage[key]
    } else {
      return this.storage
    }
  }
  set = (key: 'token', value: string) => {
    localStorage.setItem(this.storageKey, JSON.stringify({ ...this.storage, [key]: value }))
    this.storage[key] = value
  }
}

const githubAuthMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers

  const clientStorage = new ClientStorage()
  const authorization = `Bearer ${clientStorage.get('token') || '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'}`

  operation.setContext({
    clientStorage,
    headers: {
      authorization,
    },
  })

  return forward(operation)
})

const githubLink = concat(
  githubAuthMiddleware,
  new HttpLink({
    uri: 'https://api.github.com/graphql',
  }),
)

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const httpLinkWithAuth = concat(authLink, httpLink)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  split(({ getContext }) => getContext()?.client === THIRD_PARTY.GITHUB, githubLink, httpLinkWithAuth),
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
