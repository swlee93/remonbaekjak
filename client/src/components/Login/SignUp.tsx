import { useContext, useEffect, useState } from 'react'
import { Button, Input, Form, Space } from 'antd'

import { HeaderPlace } from 'components/Header'
import { UserHandlerContext } from 'contexts'

import { StyledContent } from 'styles/LayoutStyles'
import { UseMutation, UseMutationProps } from 'utils/fetches'

const SignUp = ({ onSubmit, completed, called }: UseMutationProps<any>) => {
  const { onSignUp } = useContext(UserHandlerContext)

  const onFinish = (values: any) => {
    onSubmit(values)
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

      <StyledContent gap='20px'>
        <Space>
          <Form name='login' onFinish={onFinish}>
            <Form.Item
              label='Email'
              name='email'
              rules={[{ required: true, type: 'email', message: 'It is not a valid email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </StyledContent>
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
