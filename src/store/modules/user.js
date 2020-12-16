// import Storage from "@/libs/storage.js";
// import { getMenus } from "@/api/user";

// 在store里面处理所有的菜单及路由信息
// 解决页面警告信息 return () => Promise.resolve(require(`@/views/${view}`).default)
// export const setRouter = (routerList, dataList) => {
//   // 必须为根路由，不能在其他地方生成component，除非在stor里面
//   let rootRouter = {
//     path: "/home",
//     name: "home",
//     redirect: { name: "index" },
//     component: () => import("@/views/Home"),
//     meta: {
//       auth: true,
//     },
//     children: [],
//   };
//   for (let data of rootRouter) {
//     data.path = "/" + data.path;
//     data["component"] = () => import("@/views/" + data.fileUrl);
//     if (data.children && data.children.length > 0) {
//       this.setItemRouter(routerList, dataList);
//     }
//   }
// };

// export const setItemRouter = (routerList, dataList) => {
//   console.log(routerList, dataList);
// };
// export const loadView = (view) => {
//   // 路由懒加载
//   return (resolve) => require([`@/views/${view}`], resolve);
// };

// getMenus(null)
//   .then((resp) => {
//     console.log(resp);
//   })
//   .catch();
const menus = [
  {
    key: "home",
    name: "首页",
    title: "首页",
    path: "index",
    fileUrl: "About",
    icon: "el-icon-location",
    hidden: true,
    disabled: false,
    auth: true,
    noCache: false,
  },
  {
    key: "test",
    name: "测试",
    title: "测试",
    path: "test",
    fileUrl: "test/DynamicTest",
    icon: "el-icon-location",
    hidden: true,
    disabled: false,
    auth: true,
    noCache: false,
    children: [
      {
        key: "test2",
        name: "测试2",
        title: "测试2",
        path: "test2",
        fileUrl: "test/DynamicTest2",
        icon: "",
        hidden: true,
        disabled: false,
        auth: true,
        noCache: false,
        children: [
          {
            key: "test3",
            name: "测试3",
            title: "测试3",
            path: "test3",
            fileUrl: "test/DynamicTest2",
            icon: "",
            hidden: true,
            disabled: false,
            auth: true,
            noCache: false,
          },
        ],
      },
    ],
  },
];

export default {
  namespaced: true,
  state: {
    // 用户信息
    userInfo: {},
    token: "",
    name: "",
    avatar: "",
    roles: [],
    permissions: [],
  },
  actions: {
    /**
     * @description 设置用户数据
     * @param {Object} state vuex state
     * @param dispatch
     * @param {*} userInfo userInfo
     */
    set({ state, dispatch }, userInfo) {
      // Storage.setSessionItem("menus", menus);
      console.log(menus);
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        // store 赋值
        state.userInfo = userInfo;
        // 持久化
        await dispatch(
          "store/db/set",
          {
            dbName: "sys",
            path: "user.userInfo",
            value: userInfo,
            user: true,
          },
          { root: true }
        );
        // end
        resolve();
      });
    },
    /**
     * @description 从数据库取用户数据
     * @param {Object} state vuex state
     * @param dispatch
     */
    load({ state, dispatch }) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        // store 赋值
        state.userInfo = await dispatch(
          "store/db/get",
          {
            dbName: "sys",
            path: "user.userInfo",
            defaultValue: {},
            user: true,
          },
          { root: true }
        );
        // end
        resolve();
      });
    },
  },
};
