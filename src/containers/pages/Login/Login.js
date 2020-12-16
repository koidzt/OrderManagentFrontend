import React from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from '../../../config/axios';
import LocalStorageService from '../../../services/LocalStorageService';

function Login(props) {
  const onFinish = (values) => {
    axios
      .post('/user/login', {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        notification.success({
          description: 'Login success.',
        });
        LocalStorageService.setToken(res.data.token);
        props.setRole('USER');
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          description: 'Login failed.',
        });
      });
  };

  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        style={{
          padding: '3em',
          width: '100%',
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {/* <a className="login-form-forgot" href="">
            Forgot password
          </a> */}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
