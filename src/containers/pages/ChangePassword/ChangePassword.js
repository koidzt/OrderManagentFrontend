import { Col, Row, Form, Input, Button, notification } from 'antd';
import axios from 'axios';
import React from 'react';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

function ChangePassword() {
  const onFinish = (values) => {
    axios
      .put('/user/changePassword', {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      })
      .then((res) => {
        notification.success({
          description: 'Password has been changed.',
        });
        // LocalStorageService.setToken(res.data.token);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          description: 'Change Password is failed.',
        });
      });
  };

  return (
    <div className="changePassword">
      <Row style={{ width: '100%' }}>
        <Col
          xs={24}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '5px 0 0 5px',
          }}
        >
          <h1>Change Password</h1>
        </Col>
      </Row>
      <Row style={{ width: '100%' }}>
        <Col xs={24} style={{ display: 'flex', justifyContent: 'center' }}>
          <Form {...formItemLayout} name="change-password-form" className="change-password-form" onFinish={onFinish}>
            <Form.Item
              name="oldPassword"
              label="Old Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your old password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your new password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your new password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject('The two passwords that you entered do not match!');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailFormItemLayout} style={{ margin: '0' }}>
              <Button type="primary" htmlType="submit" style={{ width: '100%', margin: '1em 0 0 0' }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default ChangePassword;
