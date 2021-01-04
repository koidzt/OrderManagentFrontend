import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { LogoutOutlined, HomeOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import LocalStorageService from '../../services/LocalStorageService';

const { Sider } = Layout;
const { SubMenu } = Menu;

function SiderMenu(props) {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      {/* <div className="logo" /> */}
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="4" icon={<HomeOutlined />}>
          <span>Home</span>
          <Link to="/" />
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="1">
            <span>Change Password</span>
            <Link to="/changePassword" />
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<UnorderedListOutlined />} title="Sales Order">
          <Menu.Item key="2">
            <span>New Sales Order</span>
            <Link to="/addSalesOrder" />
          </Menu.Item>
          <Menu.Item key="3">
            <span>Sales Order Lists</span>
            <Link to="/salesOrderLists" />
          </Menu.Item>
        </SubMenu>
        {/* <Menu.Item key="5" icon={<DesktopOutlined />}>
          Option 1
        </Menu.Item> */}
        <Menu.Item
          key="6"
          icon={<LogoutOutlined />}
          onClick={() => {
            LocalStorageService.removeToken();
            props.setRole('GUEST');
            history.push('/');
          }}
        >
          <span>Log Out</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SiderMenu;
