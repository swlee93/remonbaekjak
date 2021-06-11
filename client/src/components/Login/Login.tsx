import React, { useContext, useEffect, useState } from 'react';
import { Button, Input, Form, Space, Divider, Card } from 'antd';
import { HeaderPlace } from 'components/Header';

import { UseMutation, UseMutationProps } from 'utils/fetches';
import { MenuHandlerContext, UserContext, UserHandlerContext } from 'contexts';
import { StyledContent, StyledContentInner } from 'styles/LayoutStyles';

const Login = ({ onSubmit, completed, called }: UseMutationProps<any>) => {
  const { onSelectMenu } = useContext(MenuHandlerContext);
  const { onLogin } = useContext(UserHandlerContext);

  const onClickSignup = () => {
    onSelectMenu({ uri: '/signup' });
  };

  useEffect(() => {
    if (called && completed?.login?.token) {
      onLogin(completed.login.token);
    }
  }, [completed, called]);

  const onFinish = (values: any) => {
    onSubmit(values);
  };

  useEffect(() => {
    const xml = new XMLHttpRequest();
    fetch('https://localhost');
  }, []);

  return (
    <>
      <HeaderPlace>
        <div>Login</div>
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
              <Button type='link' onClick={onClickSignup}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </StyledContent>
    </>
  );
};

export default UseMutation(Login)`
    mutation LoginMutation( $email: String!, $password: String! ) {
        login(email: $email, password: $password) {
            token
            user {
              id
              name
              email
            }
        }
    }
`;
