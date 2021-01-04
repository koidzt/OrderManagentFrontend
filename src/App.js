import './App.css';
import { useState } from 'react';
import Login from './containers/pages/Login/Login';
import SalesOrderLists from './containers/pages/SalesOrderLists/SalesOrderLists';
import { Layout } from 'antd';
import MainLayout from './components/MainLayout/MainLayout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AddSalesOrder from './containers/pages/AddSalesOrder/AddSalesOrder';
import SalesOrder from './containers/pages/SalesOrder/SalesOrder';
import SalesReport from './containers/pages/SalesReport/SalesReport';
import ChangePassword from './containers/pages/ChangePassword/ChangePassword';
import LocalStorageService from './services/LocalStorageService';
import NotFound from './containers/pages/NotFound/NotFound';
import Index from './containers/pages/Index/Index';

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
              <Content style={{ margin: '16px 16px 0px 16px' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                  <Route exact path="/" component={Index} />
                  <Route exact path="/changePassword">
                    <ChangePassword setRole={setRole} />
                  </Route>
                  <Route exact path="/salesOrderLists" component={SalesOrderLists} />
                  <Route exact path="/addSalesOrder" component={AddSalesOrder} />
                  <Route exact path="/salesOrder/:id" component={SalesOrder} />
                  <Route exact path="/notFound" component={NotFound} />
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
