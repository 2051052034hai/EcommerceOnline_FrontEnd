// Constants
import { ROUTER } from "../constants/routes";

// Components
import Home from "./Dashboard/Home";
import Login from "./Auth/Login";
import ProductDetail from "./Dashboard/ProductDetail";
import Cart from "apps/modules/Cart";
import ProductCategory from "./Dashboard/ProductCategory";
import { Purchase_History } from "./Dashboard/Purchase_History";
import sellersPage from "./Dashboard/SellersPage";

export const routes = [
  {
    key: ROUTER.HOME.key,
    path: ROUTER.HOME.path,
    name: ROUTER.HOME.name,
    component: Home,
  },
  {
    key: ROUTER.LOGIN.key,
    path: ROUTER.LOGIN.path,
    name: ROUTER.LOGIN.name,
    component: Login,
  },
  {
    key: ROUTER.PRODUCTDETAIL.key,
    path: ROUTER.PRODUCTDETAIL.path,
    name: ROUTER.PRODUCTDETAIL.name,
    component: ProductDetail,
  },
  {
    key: ROUTER.CART.key,
    path: ROUTER.CART.path,
    name: ROUTER.CART.name,
    component: Cart,
  },
  {
    key: ROUTER.PRODUCTBYSUB.key,
    path: ROUTER.PRODUCTBYSUB.path,
    name: ROUTER.PRODUCTBYSUB.name,
    component: ProductCategory,
  },
  {
    key: ROUTER.PURCHASEHISTORY.key,
    path: ROUTER.PURCHASEHISTORY.path,
    name: ROUTER.PURCHASEHISTORY.name,
    component: Purchase_History,
  },
  {
    key: ROUTER.SELLERSPAGE.key,
    path: ROUTER.SELLERSPAGE.path,
    name: ROUTER.SELLERSPAGE.name,
    component: sellersPage,
  },
];
