import './App.css';
import { useState } from 'react';
import Login from './containers/pages/Login/Login';
import SalesOrderList from './containers/pages/SalesOrderList/SalesOrderList';
import { Layout } from 'antd';
import MainLayout from './components/MainLayout/MainLayout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddSalesOrder from './containers/pages/AddSalesOrder/AddSalesOrder';
import SalesReport from './containers/pages/SalesReport/SalesReport';
import ChangePassword from './containers/pages/ChangePassword/ChangePassword';
import LocalStorageService from './services/LocalStorageService';

const { Content } = Layout;

function App() {
  const [role, setRole] = useState(LocalStorageService.getRole());

  return (
    <>
      <BrowserRouter>
        <Switch>
          {role === 'GUEST' && <Login setRole={setRole} />}
          {role === 'USER' && (
            <MainLayout setRole={setRole}>
              <Content style={{ margin: '16px' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                  <Route exact path="/changePassword">
                    <ChangePassword setRole={setRole} />
                  </Route>
                  <Route exact path="/salesOrderList" component={SalesOrderList} />
                  <Route exact path="/addSalesOrder" component={AddSalesOrder} />
                  {/* <Route exact path="/salesReport" component={SalesReport} /> */}
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
