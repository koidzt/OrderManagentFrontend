import { Row, Col, Table, Button, notification } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const columns = [
  {
    title: 'Product Code',
    dataIndex: 'code',
    editable: true,
    fixed: 'left',
  },
  {
    title: 'Product name',
    dataIndex: 'name',
    editable: false,
    fixed: 'left',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
  },
  {
    title: 'Price Per Unit',
    dataIndex: 'price',
  },
  // {
  //   title: 'Price (InVat)',
  //   dataIndex: 'price_in_vat',
  // },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    editable: true,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },

  // {
  //   title: 'Amount (InVat)',
  //   dataIndex: 'amount_in_vat',
  // },
];

// const data = [
//   {
//     key: '1',
//     code: 'POM-002',
//     name: 'John Brown',
//     description: 'description',
//     unit: 'unit',
//     price: '100',
//     price_in_vat: '107',
//     quantity: '1',
//     amount: '100',
//     amount_in_vat: '107',
//   },
// ];

function SalesOrder() {
  const history = useHistory();
  const params = useParams();
  console.log(params.id);
  const [salesOrder, setSalesOrder] = useState({
    Customer: { CustomerAddresses: [{}] },
    ProductLists: [{ Product: {} }],
    User: {},
  });

  useEffect(() => {
    axios.get(`/salesOrder/${params.id}`).then((res) => {
      if (!res.data) {
        return history.push('/notFound');
      }
      setSalesOrder(res.data);
    });
  }, []);
  console.log(salesOrder);

  const data = salesOrder.ProductLists.map((productList) => {
    return {
      key: productList.Product.id,
      code: productList.Product.code,
      name: productList.Product.name,
      description: productList.Product.description,
      unit: productList.Product.unit,
      price: productList.Product.price,
      price_in_vat: productList.price_in_vat,
      quantity: productList.quantity,
      amount: productList.amount,
      amount_in_vat: productList.amount_in_vat,
    };
  });

  const onClickCancel = () => {
    console.log('Cancel');
    axios.put(`/salesOrder/${params.id}`, {
      status: 'Cancel',
    });
    axios
      .get(`/salesOrder/${params.id}`)
      .then((res) => {
        if (!res.data) {
          return history.push('/notFound');
        }
        setSalesOrder(res.data);
      })
      .then((res) => {
        notification.success({
          description: 'Sales Order updated success!',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="SalesOrder">
      <Row style={{ width: '100%' }}>
        <Col xs={24} style={{ display: 'flex', justifyContent: 'flex-start', padding: '5px 0 0 5px' }}>
          <h1>Sales Order</h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 1em',
            }}
          >
            <span style={{ backgroundColor: '#DDDDDD', padding: '0.2em' }}>{salesOrder.status}</span>
          </div>
        </Col>
      </Row>
      <Row style={{ width: '100%' }}>
        <Col xs={24}>
          <ul
            style={{
              listStyleType: 'none',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              padding: '0',
              margin: '0',
            }}
          >
            {/* <li style={{ paddingRight: '1em' }}>
              <Button type="primary" style={{ width: '120px' }}>
                Edit Order
              </Button>
            </li> */}
            <li style={{ paddingRight: '1em' }}>
              <Button type="danger" style={{ width: '120px' }} onClick={onClickCancel}>
                Cancel Order
              </Button>
            </li>
          </ul>
        </Col>
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'center', padding: '5px 0 0 5px' }}>
        <Col xs={24} md={12} style={{ padding: '1em 0 1em 1em' }}>
          <Row style={{ justifyContent: 'space-around' }}>
            <Col xs={8} md={8} style={{ textAlign: 'end' }}>
              <div style={{ paddingBottom: '1em' }}>SO : </div>
              <div style={{ paddingBottom: '1em' }}>DATE : </div>
              <div style={{ paddingBottom: '1em' }}>PO : </div>
              <div style={{ paddingBottom: '1em' }}>CUSTOMER : </div>
              <div style={{ paddingBottom: '1em' }}>PAYMENT TERM : </div>
              <div style={{ paddingBottom: '1em' }}>CREDIT TERM : </div>
            </Col>
            <Col xs={14} md={14} style={{ textAlign: 'start' }}>
              <div style={{ paddingBottom: '1em' }}> {salesOrder.so} </div>
              <div style={{ paddingBottom: '1em' }}> {salesOrder.date} </div>
              <div style={{ paddingBottom: '1em' }}> {salesOrder.po ? salesOrder.po : '-'} </div>
              <div style={{ paddingBottom: '1em' }}>
                {salesOrder.Customer.code} {salesOrder.Customer.name}
              </div>
              <div style={{ paddingBottom: '1em' }}> {salesOrder.payment_term} </div>
              <div style={{ paddingBottom: '1em' }}> {salesOrder.credit_term} </div>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={12} style={{ padding: '1em 1em 1em 0' }}>
          <Row style={{ justifyContent: 'space-around' }}>
            <Col xs={8} md={6} style={{ textAlign: 'end' }}>
              <div style={{ paddingBottom: '1em' }}>CONTACT : </div>
              <div style={{ paddingBottom: '1em' }}>PHONE : </div>
              <div style={{ paddingBottom: '1em' }}>TEL : </div>
              <div style={{ paddingBottom: '1em' }}>ADDRESS : </div>
            </Col>
            <Col xs={14} md={16} style={{ textAlign: 'start' }}>
              <div style={{ paddingBottom: '1em' }}> {salesOrder.Customer.contact} </div>
              <div style={{ paddingBottom: '1em' }}> {salesOrder.Customer.phone}</div>
              <div style={{ paddingBottom: '1em' }}> {salesOrder.Customer.tel}</div>
              <div style={{ paddingBottom: '1em' }}>
                {' '}
                {salesOrder.Customer.CustomerAddresses[0].address}
                <br />
                {salesOrder.Customer.CustomerAddresses[0].subdistrict}{' '}
                {salesOrder.Customer.CustomerAddresses[0].district}
                <br />
                {salesOrder.Customer.CustomerAddresses[0].province} {salesOrder.Customer.CustomerAddresses[0].zip_code}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={24} style={{ padding: '1em' }}>
          <Table columns={columns} dataSource={data} />
        </Col>
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Col xs={24} md={10} style={{ padding: '1em', border: '1px solid lightgrey', margin: '1em 0 0 0' }}>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <Col>
              <h2 style={{ textAlign: 'center' }}>Summary</h2>
            </Col>
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Col
              xs={16}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <div>
                <h4 style={{ padding: '0.5em 0' }}>Total (ExVat)</h4>
                <h4 style={{ padding: '0.5em 0' }}>Discount ( {salesOrder.discount} %)</h4>
                <h4 style={{ padding: '0.5em 0' }}>Grand Total (ExVat)</h4>
                <h4 style={{ padding: '0.5em 0' }}>Vat ( {salesOrder.vat} %)</h4>
                <h4 style={{ padding: '0.5em 0' }}>Grand Total (InVat)</h4>
              </div>
            </Col>
            <Col xs={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <h4 style={{ padding: '0.5em 0' }}>{salesOrder.total}</h4>
              <h4 style={{ padding: '0.5em 0' }}>{((salesOrder.discount / 100) * salesOrder.total).toFixed(2)}</h4>
              <h4 style={{ padding: '0.5em 0' }}>{salesOrder.total_ex_vat}</h4>
              <h4 style={{ padding: '0.5em 0' }}>{(salesOrder.total_ex_vat * (salesOrder.vat / 100)).toFixed(2)}</h4>
              <h4 style={{ padding: '0.5em 0' }}>{salesOrder.total_in_vat}</h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default SalesOrder;
