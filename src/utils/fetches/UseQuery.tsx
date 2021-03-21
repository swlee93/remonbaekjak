import React, { createContext, FunctionComponent, useMemo, useState } from 'react'
import { ApolloError, gql, QueryHookOptions, useQuery } from '@apollo/client'

interface UseQueryComponentProps {
  children: Children
  query: string
  ownProps: any
}
interface UseQueryProps {
  loading: boolean
  error?: ApolloError
  data: any
  setOptions: (options: QueryHookOptions) => void
  [key: string]: any
}
type Children = FunctionComponent<UseQueryProps>

const UseQueryContext = createContext<UseQueryProps>({
  loading: false,
  error: undefined,
  data: undefined,
  setOptions: () => {},
})

const UseQueryComponent = ({ children, query, ownProps = {} }: UseQueryComponentProps) => {
  const [QUERY_GENERATED] = useState(() => {
    return gql(query)
  })
  const [options, setOptions] = useState<QueryHookOptions>()
  const { loading, error, data } = useQuery(QUERY_GENERATED, options)
  console.log('children', children, query)

  return (
    <UseQueryContext.Provider value={{ loading, error, data, setOptions }}>
      {children({ loading, error, data, setOptions, ...ownProps })}
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
      children
    )
}

export { UseQuery as default, UseQueryContext }
export type { UseQueryProps }
