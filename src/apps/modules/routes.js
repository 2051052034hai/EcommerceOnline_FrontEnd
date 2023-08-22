// Constants
import { ROUTER } from "../constants/routes";

// Components
import NotFoundPage from "./NotFoundPage";
import Home from "./Dashboard/Home";
import Login from "./Auth/Login";
import ProductDetail from "./Dashboard/ProductDetail";
import Cart from "apps/modules/Cart";

export const routes = [
  {
    key: ROUTER.NOTFOUNDPAGE.key,
    path: ROUTER.NOTFOUNDPAGE.path,
    name: ROUTER.NOTFOUNDPAGE.name,
    component: NotFoundPage,
  },
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
];
