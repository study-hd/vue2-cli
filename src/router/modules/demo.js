export default [
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/About"),
    meta: {
      hidden: false,
      icon: "",
      title: "首页",
      auth: true,
    },
  },
];
