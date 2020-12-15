import { Layout } from 'antd';
import SiderMenu from './SiderMenu';

const { Header, Footer } = Layout;

function MainLayout({ children }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderMenu />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <h1 style={{ fontSize: '2em', color: '#F0F0F0', backgroundColor: '#001529', padding: '0 0.5em' }}>
            Order Management
          </h1>
        </Header>
        {children}
        <Footer style={{ textAlign: 'center' }}>Order Management ©2020 Created by Koi.Dzt</Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
