import React, { createContext, FunctionComponent, useMemo, useState } from 'react'
import { ApolloError, gql, QueryHookOptions, useQuery } from '@apollo/client'
type Children = FunctionComponent<UseQueryProps<any>>
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
  called: boolean
  [key: string]: any
} & T

const UseQueryContext = createContext<UseQueryProps<any>>({
  loading: false,
  error: undefined,
  data: undefined,
  setOptions: () => {},
  refetch: () => {},
  called: false,
})

const getVariablesFromMatchProps = (query: string = '', props: any = {}) => {
  const regex = /(?<!\\)\$([^\W$]+)/g

  let variables: any = {}
  let context: any = Object.assign({}, props)
  let test
  while ((test = regex.exec(query))) {
    const matchKey = test[1]
    if (matchKey && props.hasOwnProperty(matchKey)) {
      variables[matchKey] = props[matchKey]
    }
  }

  return { variables, context }
}

const UseQueryComponent = ({ children, query, ownProps = {} }: UseQueryComponentProps) => {
  const [QUERY_GENERATED] = useState(() => {
    return gql(query)
  })

  const [options, setOptions] = useState<QueryHookOptions>(() => getVariablesFromMatchProps(query, ownProps))
  const { loading, error, data, refetch, called } = useQuery(QUERY_GENERATED, options)

  return (
    <UseQueryContext.Provider value={{ loading, error, data, setOptions, refetch, called }}>
      <>{children({ loading, error, data, setOptions, refetch, called, ...ownProps })}</>
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
      <>{children({ loading: false, error: false, data: undefined, called: false, ...(props || {}) })}</>
    )
}

export { UseQuery as default, UseQueryContext }
export type { UseQueryProps }
