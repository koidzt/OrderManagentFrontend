import { Row, Col, Table } from 'antd';
import React from 'react';
import { Form, DatePicker, Button, Input, InputNumber } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const rangeConfig = {
  rules: [
    {
      type: 'array',
      required: true,
      message: 'Please select time!',
    },
  ],
};

const onFinish = (values) => {
  console.log(values);
};

function AddSaleOrder() {
  return (
    <div className="addSaleOrder">
      <Form name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Col xs={24} md={11}>
            <Form.Item name="so" label="SO" rules={[{ required: true }]}>
              <Input defaultValue="63120001" />
            </Form.Item>
            <Form.Item name="date-picker" label="DatePicker" {...config}>
              <DatePicker />
            </Form.Item>
            <Form.Item name="po" label="PO">
              <Input />
            </Form.Item>
            <Form.Item name="code" label="Customer Code" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Customer name">
              <Input />
            </Form.Item>
            <Form.Item name="payment_term" label="Payment term">
              <Input />
            </Form.Item>
            <Form.Item name="credit_term" label="Credit term">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={11}>
            Address
            <br />
            Contact
            <br />
            Tel
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={24}>
            <Table />
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddSaleOrder;
