import AddSalesOrder from '../containers/pages/AddSalesOrder/AddSalesOrder';
import Login from '../containers/pages/Login/Login';
import SalesOrderList from '../containers/pages/SalesOrderList/SalesOrderList';

const components = {
  //GUEST
  login: {
    path: '/',
    page: Login,
  },
  //USER
  // profile: {
  //   path: "/profile/:id",
  //   page: Profile
  // },
  addSalesOrder: {
    path: '/addSalesOrder',
    page: AddSalesOrder,
  },
  saleOrderList: {
    path: '/saleOrderList',
    page: SalesOrderList,
  },
};

const roles = {
  GUEST: [components.login],
  USER: [components.addSalesOrder, components.salesOrderList],
};

export default roles;
