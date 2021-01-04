import React from 'react';
import { Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

function Index() {
  return (
    <div className="index">
      <Row style={{ width: '100%' }}>
        <Col
          xs={24}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '5px 0 0 5px',
          }}
        >
          <h1>Home</h1>
        </Col>
      </Row>
      <Row>
        <Col
          xs={24}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '5px 0 0 5px',
          }}
        >
          <ul style={{ listStyleType: 'none' }}>
            <div style={{ color: '#595959', fontSize: '18px' }}>User</div>
            <li style={{ paddingLeft: '1.5em' }}>
              <a> Change Password</a>
            </li>
          </ul>
          <ul style={{ listStyleType: 'none' }}>
            <div style={{ color: '#595959', fontSize: '18px' }}>Sales Order</div>
            <li style={{ paddingLeft: '1.5em' }}>
              <Link to="/addSalesOrder">New Sales Order</Link>
            </li>
            <li style={{ paddingLeft: '1.5em' }}>
              <Link to="/salesOrderLists">Sales Order Lists</Link>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}

export default Index;
