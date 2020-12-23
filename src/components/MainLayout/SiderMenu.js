import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, LogoutOutlined, TeamOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import LocalStorageService from '../../services/LocalStorageService';

const { Sider } = Layout;
const { SubMenu } = Menu;

function SiderMenu(props) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      {/* <div className="logo" /> */}
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
          {/* <Menu.Item key="4">
            <span>Sales Report</span>
            <Link to="/salesReport" />
          </Menu.Item> */}
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
          }}
        >
          <span>Log Out</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SiderMenu;
