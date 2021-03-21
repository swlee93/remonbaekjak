import React, { createContext, FunctionComponent, useMemo, useState } from 'react'
import { ApolloError, gql, QueryHookOptions, useQuery } from '@apollo/client'

interface UseQueryComponentProps {
  children: Children
  query: string
  ownProps: any
}
type UseQueryProps<T> = {
  loading: boolean
  error?: ApolloError
  data: any
  setOptions: (options: QueryHookOptions) => void
  refetch: () => void
  [key: string]: any
} & T
type Children = FunctionComponent<UseQueryProps<any>>

const UseQueryContext = createContext<UseQueryProps<any>>({
  loading: false,
  error: undefined,
  data: undefined,
  setOptions: () => {},
  refetch: () => {},
})

const UseQueryComponent = ({ children, query, ownProps = {} }: UseQueryComponentProps) => {
  const [QUERY_GENERATED] = useState(() => {
    return gql(query)
  })
  const [options, setOptions] = useState<QueryHookOptions>()
  const { loading, error, data, refetch } = useQuery(QUERY_GENERATED, options)

  return (
    <UseQueryContext.Provider value={{ loading, error, data, setOptions, refetch }}>
      <>{children({ loading, error, data, setOptions, refetch, ...ownProps })}</>
    </UseQueryContext.Provider>
  )
}

const UseQuery = (children: Children) => (literal: TemplateStringsArray, ...variables: string[]) => {
  const query = literal.raw.reduce((acc, curr, idx) => acc + curr + (variables[idx] || ''), '')

  return (props: any) =>
    query ? (
      <UseQueryComponent query={query} ownProps={props}>
        {children}
      </UseQueryComponent>
    ) : (
      <>{children({ loading: false, error: false, data: undefined, ...(props || {}) })}</>
    )
}

export { UseQuery as default, UseQueryContext }
export type { UseQueryProps }
