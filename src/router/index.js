import { createRouter, createWebHashHistory } from "vue-router";

import Home from "../views/Home.vue";
import ProductInfo from "../components/Product.vue";
import Search from "../components/Search.vue";

import SellerHome from "../components/SellerHome.vue";
import MyListings from "../components/MyListings.vue";
import NewListings from "../components/NewListings.vue";
import SellerLogin from "../components/SellerLogin.vue";
import SellerSignup from "../components/SellerSignup.vue";
import SellerProfileInfo from "../components/SellerProfileInfo.vue";

import UserLogin from "../components/UserLogin.vue";
import UserSignup from "../components/UserSignup.vue";
import UserInfo from "../components/UserInfo.vue";
import Cart from "../components/Cart.vue";
import Orders from "../components/Orders.vue";
import Billing from "../components/Billing.vue";

import AdminLogin from "../views/Admin/AdminLogin.vue";
import AdminApprovals from "../views/Admin/AdminApprovals.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product/:productid",
    name: "ProductInfo",
    component: ProductInfo,
    props: true,
  },
  {
    path: "/search/",
    name: "Search",
    component: Search,
    props: (route) => ({
      cat_id: route.query.cat_id,
      subcat_id: route.query.subcat_id,
      search_keyword: route.query.search_keyword,
      sort_by: route.query.sort_by,
      min_limit: route.query.min_limit,
      max_limit: route.query.max_limit,
    }),
  },
  {
    path: "/users/login",
    name: "UserLogin",
    component: UserLogin,
  },
  {
    path: "/users/signup",
    name: "UserSignup",
    component: UserSignup,
  },
  {
    path: "/users/profile",
    name: "UserInfo",
    component: UserInfo,
  },
  {
    path: "/users/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/users/orders",
    name: "Orders",
    component: Orders,
  },
  {
    path: "/users/checkout",
    name: "Billing",
    component: Billing,
  },
  {
    path: "/sellers/",
    name: "SellerHome",
    component: SellerHome,
  },
  {
    path: "/sellers/mylistings",
    name: "MyListings",
    component: MyListings,
  },
  {
    path: "/sellers/newlisting/:productid?",
    name: "NewListings",
    component: NewListings,
    props: true,
  },
  {
    path: "/sellers/login",
    name: "SellerLogin",
    component: SellerLogin,
  },
  {
    path: "/sellers/signup",
    name: "SellerSignup",
    component: SellerSignup,
  },
  {
    path: "/sellers/profile",
    name: "SellerProfileInfo",
    component: SellerProfileInfo,
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin,
  },
  {
    path: "/admin/approvals",
    name: "AdminApprovals",
    component: AdminApprovals,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  // Check for valid session token if user is trying to access pages which authentication
  if (
    to.fullPath.includes("/users/") &&
    !(
      to.fullPath.includes("/users/login") ||
      to.fullPath.includes("/users/signup")
    )
  ) {
    if (
      sessionStorage.getItem("user_session_token") != undefined &&
      sessionStorage.getItem("user_session_token") != ""
    ) {
      return true;
    } else {
      return "/users/login";
    }
  } else if (
    to.fullPath.includes("/sellers/") &&
    !(
      to.fullPath.includes("/sellers/login") ||
      to.fullPath.includes("/sellers/signup")
    )
  ) {
    if (
      sessionStorage.getItem("seller_session_token") != undefined &&
      sessionStorage.getItem("seller_session_token") != ""
    ) {
      return true;
    } else {
      return "/sellers/login";
    }
  } else if (
    to.fullPath.includes("/admin/") &&
    !to.fullPath.includes("/admin/login")
  ) {
    if (
      sessionStorage.getItem("admin_session_token") != undefined &&
      sessionStorage.getItem("admin_session_token") != ""
    ) {
      return true;
    } else {
      return "/admin/login";
    }
  }
});
export default router;
