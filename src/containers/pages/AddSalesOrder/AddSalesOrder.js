import { Row, Col, Table, Form, DatePicker, Button, Input, InputNumber, Select, notification } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

const dateFormat = 'YYYY-MM-DD';

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

function AddSalesOrder() {
  // const [salesOrderLists, setSalesOrderLists] = useState([]);
  const [productLists, setProductLists] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customerAddresses, setCustomerAddresses] = useState('');
  const [contact, setContact] = useState('');
  const [phone, setPhone] = useState('');
  const [tel, setTel] = useState('');
  const [discount, setDiscount] = useState(0);
  const [vat, setVat] = useState(7);
  const [form] = Form.useForm();
  const history = useHistory();

  useEffect(() => {
    axios.get('/product/').then((res) => {
      setProducts(res.data);
    });
    axios.get('/customer/').then((res) => {
      setCustomers(res.data);
    });
    // axios.get('/salesOrder/all').then((res) => {
    //   setSalesOrderLists(res.data);
    // });
    form.setFieldsValue({ date: moment(new Date(), dateFormat), discount, vat });
  }, []);

  const onFinish = (values) => {
    console.log(values);
    console.log(customerId);
    console.log(productLists);
    axios
      .post('/salesOrder/', {
        // so: values.so,
        date: values.date.toDate(),
        po: values.po,
        customer_id: customerId,
        payment_term: values.payment_term,
        credit_term: values.credit_term,
        discount: values.discount,
        vat: values.vat,
        total: totalExVat,
        total_in_vat: totalInVat,
        productList: productLists,
      })
      .then((res) => {
        history.push('/salesOrderList');
        notification.success({
          description: 'Sales Order created success!',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeCustomer = (code) => {
    // console.log(code);
    axios
      .get('/customer/byCode/' + code)
      .then(
        ({
          data: {
            id,
            credit_term,
            payment_term,
            contact,
            phone,
            tel,
            CustomerAddresses: [{ address, subdistrict, district, province, zip_code }],
          },
        }) => {
          form.setFieldsValue({ credit_term, payment_term });
          setCustomerAddresses(`${address}\n${subdistrict} ${district}\n${province} ${zip_code}`);
          console.log(contact);
          console.log(tel);
          setContact(contact);
          setPhone(phone);
          setTel(tel);
          setCustomerId(id);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeDiscount = (e) => {
    setDiscount(Number(e.target.value));
  };

  const onChangeVat = (e) => {
    setVat(Number(e.target.value));
  };

  const totalExVat = productLists.reduce((acc, product) => {
    return acc + product.amount;
  }, 0);

  const grandTotal = totalExVat * (1 - discount / 100);
  const totalInVat = grandTotal * (1 + vat / 100);

  return (
    <div className="addSalesOrder">
      <Row style={{ width: '100%' }}>
        <Col xs={24} md={24} style={{ display: 'flex', justifyContent: 'flex-start', padding: '5px 0 0 5px' }}>
          <h1>New Sales Order</h1>
        </Col>
      </Row>
      <Form form={form} name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
        {/* SALES ORDER DETAIL */}
        <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
          {/* SALES ORDER MODEL */}
          <Col xs={24} md={8}>
            {/* <Form.Item name="so" label="SO" rules={[{ required: true }]}>
              <Input />
            </Form.Item> */}
            <Form.Item name="date" label="Date" {...config}>
              <DatePicker />
            </Form.Item>
            <Form.Item name="po" label="PO">
              <Input />
            </Form.Item>
            <Form.Item name="code" label="Customer" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="Search to Select"
                optionFilterProp="children"
                onChange={onChangeCustomer}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
              >
                {customers.map((customer) => {
                  return <Option value={customer.code}>{customer.code + ' : ' + customer.name}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item name="payment_term" label="Payment term">
              <Input />
            </Form.Item>
            <Form.Item name="credit_term" label="Credit term">
              <Input />
            </Form.Item>
          </Col>
          {/* CUSTOMER MODEL */}
          <Col xs={24} md={10}>
            <Form.Item label="Contact">
              <Input disabled placeholder={contact} />
            </Form.Item>
            <Form.Item label="Phone">
              <Input disabled placeholder={phone} />
            </Form.Item>
            <Form.Item label="Tel">
              <Input disabled placeholder={tel} />
            </Form.Item>
            <Form.Item label="Address">
              <TextArea autoSize={{ minRows: 3, maxRows: 3 }} disabled placeholder={customerAddresses} />
            </Form.Item>
          </Col>
        </Row>
        {/* PRODUCT LISTS */}
        <Row>
          <Col xs={24} md={24}>
            <ProductList productLists={productLists} setProductLists={setProductLists} products={products} />
          </Col>
        </Row>
        {/* SUMMARY ORDER */}
        <Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Col xs={24} md={6} style={{ padding: '1em' }}>
            <Form.Item name="discount" label="%Discount" onChange={onChangeDiscount}>
              <Input />
            </Form.Item>
            <Form.Item name="vat" label="%Vat" onChange={onChangeVat}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={8} style={{ padding: '1em', border: '1px solid lightgrey', margin: '1em 0 0 0' }}>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Col>
                <h2 style={{ textAlign: 'center' }}>Summary</h2>
              </Col>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Col xs={16} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <h3 style={{ padding: '0.5em 0' }}>Total (ExVat)</h3>
                <h3 style={{ padding: '0.5em 0' }}>Discount</h3>
                <h3 style={{ padding: '0.5em 0' }}>Grand Total (ExVat)</h3>
                <h3 style={{ padding: '0.5em 0' }}>Vat {vat.toFixed(0)}%</h3>
                <h3 style={{ padding: '0.5em 0' }}>Grand Total (InVat)</h3>
              </Col>
              <Col xs={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <h3 style={{ padding: '0.5em 0' }}>{totalExVat.toFixed(2)}</h3>
                <h3 style={{ padding: '0.5em 0' }}>{((discount / 100) * totalExVat).toFixed(2)}</h3>
                <h3 style={{ padding: '0.5em 0' }}>{grandTotal.toFixed(2)}</h3>
                <h3 style={{ padding: '0.5em 0' }}>{((grandTotal * vat) / 100).toFixed(2)}</h3>
                <h3 style={{ padding: '0.5em 0' }}>{(grandTotal * (1 + vat / 100)).toFixed(2)}</h3>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}
        >
          <Col xs={24} md={8}>
            <Form.Item
              style={{
                margin: '1em 0 0 0',
                width: '100%',
                height: '100%',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <Button type="primary" htmlType="submit" className="login-form-button">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddSalesOrder;
