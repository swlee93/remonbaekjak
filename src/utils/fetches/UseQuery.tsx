import React, { createContext, FunctionComponent, useEffect, useMemo, useState } from 'react'
import { ApolloError, gql, QueryHookOptions, useQuery } from '@apollo/client'
import { getVariablesFromMatchProps, objectToString } from 'utils/common'
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

const UseQueryComponent = ({ children, query, ownProps = {} }: UseQueryComponentProps) => {
  const [QUERY_GENERATED] = useState(() => {
    return gql(query)
  })

  const [options, setOptions] = useState<QueryHookOptions>({
    context: ownProps,
    variables: getVariablesFromMatchProps(query, ownProps),
  })

  useEffect(() => {
    const variables = getVariablesFromMatchProps(query, ownProps)
    setOptions({ ...options, variables })
  }, [objectToString(getVariablesFromMatchProps(ownProps)) !== objectToString(options.variables)])

  const { loading, error, data, refetch, called } = useQuery(QUERY_GENERATED, options)
  return (
    <UseQueryContext.Provider value={{ loading, error, data, setOptions, refetch, called }}>
      <>{children({ loading, error, data, setOptions, refetch, called, ...ownProps })}</>
    </UseQueryContext.Provider>
  )
}

const UseQuery = (children: Children) => (literal: TemplateStringsArray, ...variables: string[]) => {
  const query = literal.raw.reduce((acc, curr, idx) => acc + curr + (variables[idx] || ''), '')

  return (props: any) => (
    <UseQueryComponent query={query} ownProps={props}>
      {children}
    </UseQueryComponent>
  )
}

export { UseQuery as default, UseQueryContext }
export type { UseQueryProps }
