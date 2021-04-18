import React, { useContext, useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { HeaderPlace } from 'components/Header'

import { UseMutation, UseMutationProps } from 'utils/fetches'
import { MenuHandlerContext, UserContext, UserHandlerContext } from 'contexts'

const Login = ({ onSubmit, completed, called }: UseMutationProps<any>) => {
  const { onSelectMenu } = useContext(MenuHandlerContext)
  const { onLogin } = useContext(UserHandlerContext)
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })
  const onClickLogin = () => {
    onSubmit(formState)
  }
  const onClickSignup = () => {
    onSelectMenu({ uri: '/signup' })
  }

  useEffect(() => {
    if (called && completed?.login?.token) {
      onLogin(completed?.login?.token)
    }
  }, [completed, called])

  return (
    <>
      <HeaderPlace>
        <div>Login</div>
      </HeaderPlace>

      <div>
        <Input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type='text'
          placeholder='Your email address'
        />
        <Input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type='password'
          placeholder='Choose a safe password'
        />
      </div>
      <div>
        <Button onClick={onClickLogin}>Login</Button>
        <Button onClick={onClickSignup}>Sign Up</Button>
      </div>
    </>
  )
}

export default UseMutation(Login)`
    mutation LoginMutation( $email: String!, $password: String! ) {
        login(email: $email, password: $password) {
            token
        }
    }
`
