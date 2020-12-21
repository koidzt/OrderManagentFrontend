import React from 'react';
import { Form, Input, Button, Checkbox, notification, Layout } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from '../../../config/axios';
import LocalStorageService from '../../../services/LocalStorageService';

const { Header, Footer, Content } = Layout;

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
      <Layout style={{ minHeight: '100vh' }}>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <h1 style={{ fontSize: '2em', color: '#F0F0F0', backgroundColor: '#001529', padding: '0 0.5em' }}>
              Order Management
            </h1>
          </Header>
          <Content style={{ margin: '16px 16px 0px 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, height: '100%' }}>
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
          </Content>
          <Footer style={{ textAlign: 'center' }}>Order Management ©2020 Created by Koi.Dzt</Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default Login;
