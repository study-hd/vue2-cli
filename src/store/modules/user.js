import util from "@/plugins/util";
// import { login, logout, getUserInfo } from "@/api/user";
import { setRouter } from "@/router/getRouters";

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
  mutations: {
    setUserInfo: (state, userInfo) => {
      state.name = userInfo.name || "";
      state.avatar = userInfo.avatar === "" ? require("@/assets/logo.png") : process.env.VUE_APP_BASE_API + user.avatar;
      state.roles = userInfo.roles || [];
      state.permissions = userInfo.permissions || [];
    },
    setMenus: () => {},
    setRouters: () => {},
  },
  actions: {
    login(userInfo) {
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
        util.cookies.set("uuid", Math.floor(Math.random() * 10000000));
        util.cookies.set("token", Math.floor(Math.random() * 10000000));
        resolve();
        reject("err");
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
        resolve();
        reject("err");
      });
    },
    async getUserInfo({ commit, state }) {
      // let userParams = {
      //   token: state.token,
      //   uuid: state.uuid,
      // };
      // await getUserInfo(userParams)
      //   .then(async (resp) => {
      //     await commit("setUserInfo", resp.user);
      //     await commit("setMenus", resp.user.menus);
      //     await commit("setRouters", setRouter(resp.user.menus));
      //   })
      //   .catch((error) => {
      //     util.log.danger(">>>>>> 获取用户信息失败 >>>>>>", error);
      //   });

      const menus = [
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
          key: "home",
          name: "首页",
          title: "首页",
          path: "index",
          fileUrl: "Home",
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
      let userInfo = {
        token: state.token,
        uuid: state.uuid,
        name: "name",
        roles: [],
        permissions: [],
        menus: menus,
      };
      await commit("setUserInfo", userInfo);
      await commit("setMenus", userInfo.menus);
      await commit("setRouters", setRouter(userInfo.menus));
    },
  },
};
