import React from 'react';
import { Table, Button, Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';

function SalesOrderList() {
  const history = useHistory();

  const onRedirect = () => {
    history.push('/addSalesOrder');
  };

  const columns = [
    {
      title: 'Sale Order',
      dataIndex: 'so',
      sorter: {
        compare: (a, b) => a.so - b.so,
        multiple: 3,
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: {
        compare: (a, b) => a.date - b.date,
        multiple: 3,
      },
    },
    {
      title: 'Customer',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 2,
      },
    },
    {
      title: 'Amount',
      dataIndex: 'total',
      sorter: {
        compare: (a, b) => a.total - b.total,
        multiple: 1,
      },
    },
  ];

  const data = [
    {
      key: '1',
      so: 63120001,
      date: '01-12-2020',
      name: 'ร้านกอไก่',
      total: 1000,
    },
    {
      key: '2',
      so: 63120002,
      date: '02-12-2020',
      name: 'ร้านขอไข่',
      total: 2000,
    },
    {
      key: '3',
      so: 63120005,
      date: '03-12-2020',
      name: 'ร้านคอควาย',
      total: 1500,
    },
    {
      key: '4',
      so: 63120010,
      date: '04-12-2020',
      name: 'ร้านฅอฅน',
      total: 3000,
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <div className="saleOrderList">
      <Row style={{ width: '100%' }}>
        <Col xs={24} style={{ display: 'flex', justifyContent: 'flex-start', padding: '5px 0 0 5px' }}>
          <h1>Sales Order List</h1>
        </Col>
      </Row>
      <Row style={{ width: '100%' }}>
        <Col style={{ display: 'flex', justifyContent: 'flex-start', padding: '5px 0 0 5px' }}>
          <Button type="primary" onClick={onRedirect}>
            Add Sales Order
          </Button>
        </Col>
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Col style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            style={{ padding: '5px', width: '100%', height: '100%' }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default SalesOrderList;
