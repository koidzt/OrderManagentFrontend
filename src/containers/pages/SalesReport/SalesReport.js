import { Row, Col } from 'antd';
import React from 'react';

function SalesReport() {
  return (
    <div className="salesReport">
      <Row style={{ width: '100%' }}>
        <Col xs={24} style={{ display: 'flex', justifyContent: 'flex-start', padding: '5px 0 0 5px' }}>
          <h1>Sales Report</h1>
        </Col>
      </Row>
    </div>
  );
}

export default SalesReport;
