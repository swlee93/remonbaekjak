import React, { createContext, FunctionComponent, useState } from 'react'
import { ApolloError, gql, QueryHookOptions, useQuery } from '@apollo/client'
interface UseQueryProps {
  loading: boolean
  error?: ApolloError
  data: any
  setOptions: (options: QueryHookOptions) => void
}
type Children = FunctionComponent<UseQueryProps>

const UseQueryContext = createContext<UseQueryProps>({
  loading: false,
  error: undefined,
  data: undefined,
  setOptions: () => {},
})

const UseQuery = (children: Children) => (literals: string, initialOptions: QueryHookOptions) => {
  const [QUERY_GENERATED] = useState(() => {
    return gql(literals)
  })
  const [options, setOptions] = useState<QueryHookOptions>(initialOptions)
  const { loading, error, data } = useQuery(QUERY_GENERATED, options)

  return (
    <UseQueryContext.Provider value={{ loading, error, data, setOptions }}>
      {children({ loading, error, data, setOptions })}
    </UseQueryContext.Provider>
  )
}

export { UseQuery as default, UseQueryContext }
