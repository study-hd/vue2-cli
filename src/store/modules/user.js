import util from "@/plugins/util";
// import { login, logout, getUserInfo } from "@/api/user";

// 模拟返回数据，后端要处理掉按钮级别的数据，前端不做处理，对应的数据一定要存储int或者char
// let returnDemo = {
//   id: 1, // 当前id
//   parentId: 0, // 父菜单id 0 代表顶级菜单
//   orderNum: 1, // 显示顺序 array.sort((a,b) => {return a.id - b.id});
//   type: 0, // 菜单类型 0 目录，1菜单，2按钮
//   name: "", // 菜单名称
//   title: "", // 页面标题
//   path: "", // 路由地址
//   component: "", // 组件路径
//   redirect: "", // 组件路径
//   icon: "", // 菜单图标 判断包含的内容是否包含组件以及自定义标签，否则只支持svg格式 icon.length-4 === (icon.indexOf(".svg") || icon.indexOf(".SVG"));
//   isLink: 0, // 是否为外链 默认0，1代表外链，外链时路由地址即为绝对路径
//   isCache: 0, // 是否缓存 默认0，1 keep-alive 缓存数据
//   isVisible: 0, // 是否展示隐藏 默认0，1 隐藏当前
//   isDisable: 1, // 是否可点击 默认1，0不可点 !isDisable
//   isSideMenu: 1, // 是否展示侧边栏 默认1，0不展示
//   status: 1, // 菜单状态 默认1，0停用
//   perms: "*", // 权限标识 admin:system:*
// };

// 组装动态路由
const setRouter = (dataList) => {
  // 必须为根路由，不能在其他地方生成component，除非在store里面
  // () => Promise.resolve(require(`@/views/${view}`).default)
  // () => import("@/views/Index"),
  // (resolve) => require([`@/views/${view}`], resolve);
  let blackRouter = {
    path: "",
    redirect: { name: "index" },
  };
  let rootRouter = {
    path: "/",
    redirect: { name: "index" },
  };
  let addRouters = {
    path: "/index",
    name: "index",
    redirect: { name: "home" },
    component: () => import(`@/views/Index`),
    meta: {
      auth: true,
    },
    children: [],
  };
  let allRouter = {
    path: "*",
    name: "*",
    component: () => import(`@/views/error/404`),
    meta: {
      icon: "",
      title: "404",
      auth: false,
      isDisable: true,
      isCache: false,
    },
  };
  setItemRouter(addRouters.children, dataList, "");
  return [blackRouter, rootRouter, addRouters, allRouter];
};
const setItemRouter = (routerList, dataList, baseUrl) => {
  for (let data of dataList) {
    let route = {
      path: baseUrl + "/" + data.path,
      name: data.path,
      redirect: "",
      component: (resolve) => require([`@/views/${data.component}`], resolve),
      meta: {
        icon: "",
        title: data.title,
        auth: true,
        isDisable: !data.isDisable,
        isCache: !data.isCache,
      },
      children: [],
    };
    if (data.children && data.children.length > 0) {
      route.redirect = { name: data.children[0].path };
      routerList.push(route);
      setItemRouter(route.children, data.children, baseUrl + data.path);
    } else {
      routerList.push(route);
    }
  }
};

export default {
  namespaced: true,
  state: {
    // 用户信息
    token: util.cookies.get("token"),
    uuid: util.cookies.get("uuid"),
    name: "",
    avatar: require("@/assets/logo.png"),
    roles: [],
    permissions: [],
    menus: [],
    routes: [],
  },
  getters: {
    getMenus: (state) => {
      return state.menus;
    },
    getRoutes: (state) => {
      return state.routes;
    },
  },
  mutations: {
    setUserInfo: (state, userInfo) => {
      state.name = userInfo.name || "";
      state.avatar = userInfo.avatar === "" ? require("@/assets/logo.png") : process.env.VUE_APP_BASE_API + userInfo.avatar;
      state.roles = userInfo.roles || [];
      state.permissions = userInfo.permissions || [];
    },
    setToken: (state, token) => {
      state.token = token;
    },
    setUUID: (state, uuid) => {
      state.uuid = uuid;
    },
    setMenus: (state, menus) => {
      state.menus = menus;
    },
    setRouters: (state, routers) => {
      state.routers = routers;
    },
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        // // 开始请求登录接口
        // login(userInfo)
        //   .then(async (resp) => {
        //     // 设置 cookie 一定要存 uuid 和 token 两个 cookie
        //     // 整个系统依赖这两个数据进行校验和存储
        //     // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
        //     // token 代表用户当前登录状态 建议在网络请求中携带 token
        //     // 如有必要 token 需要定时更新，默认保存一天
        //     util.cookies.set("uuid", resp.userInfo.UUID);
        //     util.cookies.set("token", resp.userInfo.token);
        //     // 结束
        //     resolve(resp);
        //   })
        //   .catch((error) => {
        //     reject(error);
        //   });
        console.log("login ", userInfo);
        userInfo["token"] = Math.floor(Math.random() * 10000000);
        userInfo["uuid"] = Math.floor(Math.random() * 10000000);
        util.cookies.set("uuid", userInfo.token);
        util.cookies.set("token", userInfo.uuid);
        commit("setToken", userInfo.token);
        commit("setUUID", userInfo.uuid);
        resolve(userInfo);
        if (!userInfo) {
          reject("error");
        }
      });
    },
    logout({ state }) {
      return new Promise((resolve, reject) => {
        // let logoutParams = {
        //   token: state.token,
        //   uuid: state.uuid,
        // };
        // logout(logoutParams)
        //   .then((resp) => {
        //     commit("setUserInfo", {});
        //     console.log(resp);
        //     resolve(resp);
        //   })
        //   .catch((error) => {
        //     reject(error);
        //   });
        // 删除cookie
        console.log("logout ", state.token, state.uuid);
        util.cookies.remove("token");
        util.cookies.remove("uuid");
        resolve(state);
        if (!state.token) {
          reject("error");
        }
      });
    },
    getUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // let userParams = {
        //   token: state.token,
        //   uuid: state.uuid,
        // };
        // await getUserInfo(userParams)
        //   .then(async (resp) => {
        //     await commit("setUserInfo", resp.user);
        //     await commit("setMenus", resp.user.menus);
        //     let routers = setRouter(resp.user.menus);
        //     commit("setRouters", routers);
        //     let menuAndRouters = {
        //       menus: resp.user.menus,
        //       routers: routers,
        //     };
        //     resolve(menuAndRouters);
        //   })
        //   .catch((error) => {
        //     util.log.danger(">>>>>> 获取用户信息失败 >>>>>>", error);
        //   });
        const returnData = [
          {
            id: 1,
            orderNum: 1,
            type: 0,
            name: "首页",
            title: "首页",
            path: "index",
            component: "Home",
            redirect: "",
            icon: "el-icon-location",
            isLink: 0,
            isCache: 0,
            isVisible: 0,
            isDisable: 1,
            isSideMenu: 1,
            status: 1,
            perms: "admin:system:*",
          },
          {
            id: 2,
            orderNum: 2,
            type: 0,
            name: "测试",
            title: "测试",
            path: "test",
            component: "",
            redirect: "",
            icon: "el-icon-location",
            isLink: 0,
            isCache: 0,
            isVisible: 0,
            isDisable: 1,
            isSideMenu: 1,
            status: 1,
            perms: "admin:system:*",
            children: [
              {
                id: 3,
                orderNum: 1,
                type: 0,
                name: "测试1",
                title: "测试1",
                path: "test1",
                component: "test/DynamicTest",
                redirect: "",
                icon: "el-icon-location",
                isLink: 0,
                isCache: 0,
                isVisible: 0,
                isDisable: 1,
                isSideMenu: 1,
                status: 1,
                perms: "admin:system:*",
              },
              {
                id: 4,
                orderNum: 2,
                type: 0,
                name: "测试2",
                title: "测试2",
                path: "test2",
                component: "test/DynamicTest2",
                redirect: "",
                icon: "el-icon-location",
                isLink: 0,
                isCache: 0,
                isVisible: 0,
                isDisable: 1,
                isSideMenu: 1,
                status: 1,
                perms: "admin:system:*",
              },
            ],
          },
        ];
        let userInfo = {
          token: state.token,
          uuid: state.uuid,
          name: "name",
          roles: [],
          permissions: [],
          menus: returnData,
        };
        commit("setUserInfo", userInfo);
        commit("setMenus", userInfo.menus);
        let routers = setRouter(userInfo.menus);
        commit("setRouters", routers);
        let menuAndRouters = {
          menus: userInfo.menus,
          routers: routers,
        };
        resolve(menuAndRouters);
        if (!userInfo) {
          reject("error");
        }
      });
    },
  },
};
