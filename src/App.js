import './App.css';
import { useState } from 'react';
import Login from './containers/pages/Login/Login';
import SaleOrderList from './containers/pages/SaleOrderList/SaleOrderList';
import { Layout } from 'antd';
import MainLayout from './components/MainLayout/MainLayout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddSaleOrder from './containers/pages/AddSaleOrder/AddSaleOrder';
import SalesReport from './containers/pages/SalesReport/SalesReport';

const { Content } = Layout;

function App() {
  const [role, setRole] = useState('guest');

  return (
    <>
      <BrowserRouter>
        <Switch>
          {role === 'guest' && <Login />}
          {role === 'user' && (
            <MainLayout>
              <Content style={{ margin: '16px' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                  <Route exact path="/saleOrderList" component={SaleOrderList} />
                  <Route exact path="/addSaleOrder" component={AddSaleOrder} />
                  <Route exact path="/salesReport" component={SalesReport} />
                </div>
              </Content>
            </MainLayout>
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
