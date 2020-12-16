// 在store里面处理所有的菜单及路由信息
// 解决页面警告信息 return () => Promise.resolve(require(`@/views/${view}`).default)
export const setRouter = (routerList, dataList) => {
  // 必须为根路由，不能在其他地方生成component，除非在stor里面
  let rootRouter = {
    path: "/index",
    name: "index",
    redirect: { name: "home" },
    component: () => import("@/views/Index"),
    meta: {
      auth: true,
    },
    children: [],
  };
  let lastRouter = {
    path: "*",
    component: () => import("@/views/error/404"),
    meta: {
      hidden: true,
      icon: "",
      noCache: false,
      title: "404",
      auth: false,
    },
  };
  let addRouters = [];
  for (let data of rootRouter) {
    data.path = "/" + data.path;
    data["component"] = () => import("@/views/" + data.fileUrl);
    if (data.children && data.children.length > 0) {
      this.setItemRouter(addRouters, dataList);
    }
  }
  rootRouter.children.concat(addRouters);
  rootRouter.children.push(lastRouter);
};

export const setItemRouter = (routerList, dataList) => {
  console.log(routerList, dataList);
};
export const loadView = (view) => {
  // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve);
};
