import demo from "./modules/demo";

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: "/",
    redirect: { name: "home" },
  },
  {
    path: "/home",
    name: "home",
    redirect: { name: "index" },
    component: () => import("@/views/Home"),
    meta: {
      hidden: false,
      icon: "",
      title: "首页",
      auth: true,
    },
    children: [...demo],
  },
  {
    path: "/",
    meta: {
      auth: true,
    },
    children: [
      // 首页 必须 name:index
      // 刷新页面 必须保留
      {
        path: "refresh",
        name: "refresh",
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            next((vm) => vm.$router.replace(from.fullPath));
          },
          render: (h) => h(),
        },
      },
      // 页面重定向 必须保留
      {
        path: "redirect/:route*",
        name: "redirect",
        hidden: true,
        component: {
          beforeRouteEnter(to, from, next) {
            next((vm) => vm.$router.replace(JSON.parse(from.params.route)));
          },
          render: (h) => h(),
        },
      },
    ],
  },
];

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login"),
    meta: {
      hidden: true,
      icon: "",
      title: "登录",
      auth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register"),
    meta: {
      hidden: true,
      icon: "",
      title: "注册",
      auth: false,
    },
  },
  {
    path: "/logout",
    name: "logout",
    redirect: { name: "login" },
    meta: {
      auth: true,
    },
  },
];

/**
 * 错误页面
 */
const errorPage = [
  // 404
  {
    path: "/error",
    name: "error",
    component: () => import("@/views/About"),
    meta: {
      hidden: false,
      icon: "",
      title: "error",
      auth: true,
    },
  },
  {
    path: "*",
    name: "404",
    component: () => import("@/views/About"),
    meta: {
      hidden: false,
      icon: "",
      title: "404",
      auth: false,
    },
  },
];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage];
