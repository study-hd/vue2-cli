export default [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home"),
    meta: {
      hidden: false,
      icon: "",
      noCache: false,
      title: "首页",
      auth: true,
    },
  },
  {
    path: "/test",
    name: "test",
    meta: {
      hidden: false,
      icon: "",
      noCache: false,
      title: "测试",
      auth: true,
    },
    children: [
      {
        path: "/test/test1",
        name: "test1",
        component: () => import("@/views/test/DynamicTest"),
        meta: {
          hidden: false,
          icon: "",
          noCache: false,
          title: "测试1",
          auth: true,
        },
      },
      {
        path: "/test/test2",
        name: "test2",
        component: () => import("@/views/test/DynamicTest2"),
        meta: {
          hidden: false,
          icon: "",
          noCache: false,
          title: "测试2",
          auth: true,
        },
      },
    ],
  },
];
