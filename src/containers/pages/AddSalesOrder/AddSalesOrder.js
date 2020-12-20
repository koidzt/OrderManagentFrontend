import { Row, Col, Table, Form, DatePicker, Button, Input, InputNumber } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';

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

function AddSalesOrder() {
  const [productLists, setProductLists] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    axios.get('/product/').then((res) => {
      setProduct(res.data);
    });
  }, []);

  const total = productLists.reduce((acc, product) => {
    return acc + product.amount;
  }, 0);

  return (
    <div className="addSalesOrder">
      <Row style={{ width: '100%' }}>
        <Col xs={24} style={{ display: 'flex', justifyContent: 'flex-start', padding: '5px 0 0 5px' }}>
          <h1>New Sales Order</h1>
        </Col>
      </Row>{' '}
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
            <ProductList productLists={productLists} setProductLists={setProductLists} product={product} />
          </Col>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Col xs={24} md={8} style={{ padding: '1em' }}>
            <Form.Item name="discount" label="%Discount">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8} style={{ padding: '1em', border: '1px solid lightgrey' }}>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Col>
                <h2 style={{ textAlign: 'center' }}>Summary</h2>
              </Col>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Col xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <h3 style={{ padding: '0.5em 0' }}>Total (ExVat)</h3>
                <h3 style={{ padding: '0.5em 0' }}>Vat</h3>
                <h3 style={{ padding: '0.5em 0' }}>Total (InVat)</h3>
              </Col>
              <Col xs={12} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <h3 style={{ padding: '0.5em 0' }}>{total.toFixed(2)}</h3>
                <h3 style={{ padding: '0.5em 0' }}>{(total * 0.07).toFixed(2)}</h3>
                <h3 style={{ padding: '0.5em 0' }}>{(total * 1.07).toFixed(2)}</h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddSalesOrder;
