import React, { createContext, FunctionComponent, useEffect, useMemo, useState } from 'react'
import { ApolloError, gql, OperationVariables, useMutation } from '@apollo/client'
import { message } from 'antd'

interface UseMutationComponentProps {
  children: Children
  query: string
  ownProps: any
}
type UseMutationProps<T> = {
  loading: boolean
  error?: ApolloError
  called: boolean
  data: any
  setOptions: (options: OperationVariables) => void
  onSubmit: Function
  [key: string]: any
} & T

type Children = FunctionComponent<UseMutationProps<any>>

const UseMutationContext = createContext<UseMutationProps<any>>({
  loading: false,
  error: undefined,
  data: undefined,
  called: undefined,
  setOptions: () => {},
  onSubmit: Function,
})

const UseMutationComponent = ({ children, query, ownProps = {} }: UseMutationComponentProps) => {
  const [QUERY_GENERATED] = useState(() => {
    return gql(query)
  })
  const [options, setOptions] = useState<OperationVariables>()
  const [onMutation, { loading, error, data, called }] = useMutation(QUERY_GENERATED, options)
  const onSubmit = (variables: any) => {
    if (onMutation) {
      try {
        console.log('variables', variables)
        onMutation({ variables })
      } catch (err) {
        console.error(err)
      }
    }
  }
  useEffect(() => {
    if (called) {
      let msg
      if (loading) {
        msg = message.loading('Action in progress..', 0)
      } else if (error) {
        msg = message.error(error)
      } else {
        msg = message.destroy()
        msg = message.success('Action is successful!', 0)
      }

      if (msg) {
        setTimeout(msg, 2500)
      }
    }
  }, [loading, error, called])

  return (
    <UseMutationContext.Provider value={{ loading, error, data, setOptions, onSubmit, called }}>
      <>{children({ loading, error, data, setOptions, onSubmit, called, ...ownProps })}</>
    </UseMutationContext.Provider>
  )
}

const UseMutation = (children: Children) => (literal: TemplateStringsArray, ...variables: string[]) => {
  const query = literal.raw.reduce((acc, curr, idx) => acc + curr + (variables[idx] || ''), '')

  return (props: any) =>
    query ? (
      <UseMutationComponent query={query} ownProps={props}>
        {children}
      </UseMutationComponent>
    ) : (
      <>{children({ loading: false, error: false, data: undefined, onSubmit: () => {}, ...(props || {}) })}</>
    )
}

export { UseMutation as default, UseMutationContext }
export type { UseMutationProps }
