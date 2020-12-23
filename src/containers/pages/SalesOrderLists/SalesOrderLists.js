import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

function SalesOrderList() {
  const history = useHistory();

  const onRedirect = () => {
    history.push('/addSalesOrder');
  };

  const [salesOrder, setSalesOrder] = useState([]);

  useEffect(() => {
    axios.get('/salesOrder/').then((res) => {
      const result = res.data.map((salesOrder) => ({
        ...salesOrder,
        name: salesOrder.Customer.name,
      }));
      setSalesOrder(result);
    });
  }, []);

  console.log(salesOrder);
  const columns = [
    {
      title: 'Sale Order',
      dataIndex: 'so',
      render: (text) => <Link to={'/salesOrder/' + salesOrder.find((el) => el.so === text).id}>{text}</Link>,
      sorter: {
        compare: (a, b) => a.so - b.so,
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: {
        compare: (a, b) => {
          if (a.date > b.date) return 1;
          if (a.date == b.date) return 0;
          if (a.date < b.date) return -1;
        },
      },
    },
    {
      title: 'Customer Name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => {
          if (a.name > b.name) return 1;
          if (a.name == b.name) return 0;
          if (a.name < b.name) return -1;
        },
      },
    },
    {
      title: 'Status SO',
      dataIndex: 'status',
      sorter: {
        compare: (a, b) => a.date - b.date,
      },
    },
    {
      title: 'Amount (Ex Vat)',
      dataIndex: 'total',
      sorter: {
        compare: (a, b) => a.total - b.total,
      },
    },
  ];

  return (
    <div className="saleOrderList">
      <Row style={{ width: '100%' }}>
        <Col
          xs={24}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '5px 0 0 5px',
          }}
        >
          <h1>Sales Order Lists</h1>
        </Col>
      </Row>
      <Row style={{ width: '100%' }}>
        <Col
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '5px 0 0 5px',
          }}
        >
          <Button type="primary" onClick={onRedirect}>
            Add Sales Order
          </Button>
        </Col>
      </Row>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Col
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Table
            columns={columns}
            dataSource={salesOrder}
            style={{
              padding: '5px',
              width: '100%',
              height: '100%',
            }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default SalesOrderList;
