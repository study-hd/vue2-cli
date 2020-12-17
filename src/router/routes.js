// import demo from "./modules/demo";

/**
 * 在主框架内显示
 */
const frameIn = [
  // {
  //   path: "/",
  //   redirect: { name: "index" },
  // },
  // {
  //   path: "/index",
  //   name: "index",
  //   redirect: { name: "home" },
  //   component: () => import("@/views/Index"),
  //   meta: {
  //     auth: true,
  //   },
  //   children: [...demo],
  // },
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
      noCache: false,
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
      noCache: false,
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
  // 404
  {
    path: "/error",
    name: "error",
    component: () => import("@/views/error/Error"),
    meta: {
      hidden: true,
      icon: "",
      noCache: false,
      title: "error",
      auth: true,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/404"),
    meta: {
      hidden: true,
      icon: "",
      noCache: false,
      title: "404",
      auth: false,
    },
  },
];

// 重新组织后导出
export default [...frameIn, ...frameOut];
