import { Button, Input } from 'antd'
import { HeaderPlace } from 'components/Header'
import { UserHandlerContext } from 'contexts'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { UseMutation, UseMutationProps } from 'utils/fetches'

const SignUp = ({ onSubmit, completed, called }: UseMutationProps<any>) => {
  const { onSignUp } = useContext(UserHandlerContext)
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
  })
  const onClickCreate = () => {
    onSubmit(formState)
  }

  useEffect(() => {
    if (completed?.signup?.token && called) {
      onSignUp(completed?.signup?.token)
    }
  }, [completed, called])
  return (
    <>
      <HeaderPlace>
        <div>Sign Up</div>
      </HeaderPlace>

      <div>
        <Input
          value={formState.name}
          onChange={(e) =>
            setFormState({
              ...formState,
              name: e.target.value,
            })
          }
          type='text'
          placeholder='Your name'
        />
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
        <Button onClick={onClickCreate}>create account</Button>
      </div>
    </>
  )
}

export default UseMutation(SignUp)`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(
      email: $email
      password: $password
      name: $name
    ) {
      token
    }
  }
`
