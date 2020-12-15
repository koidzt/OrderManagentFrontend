import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { DesktopOutlined, LogoutOutlined, TeamOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

function SiderMenu() {
  const [state, setState] = useState(false);
  return (
    <Sider collapsible collapsed={state} onCollapse={setState}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<DesktopOutlined />}>
          Option 1
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="2">
            <span>Sale Order List</span>
            <Link to="/saleOrderList" />
          </Menu.Item>
          <Menu.Item key="3">
            <span>New Sale Order</span>
            <Link to="/AddSaleOrder" />
          </Menu.Item>
          <Menu.Item key="4">
            <span>Sales Report</span>
            <Link to="/salesReport" />
          </Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<LogoutOutlined />}>
          Log Out
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SiderMenu;
