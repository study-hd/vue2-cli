import util from "@/plugins/util";
// import { login, logout } from "@/api/user";

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param username {String} 用户账号
     * @param {Object} param password {String} 密码
     * @param {Object} param route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     * vm,
     */
    login({ dispatch }, userInfo) {
      console.log("userInfo", userInfo);
      return new Promise((resolve, reject) => {
        util.cookies.set("uuid", Math.floor(Math.random() * 10000000));
        util.cookies.set("token", Math.floor(Math.random() * 10000000));
        // 设置 vuex 用户信息
        dispatch("store/user/set", { userName: "admin", token: "token", uuid: "uuid" }, { root: true });
        // 用户登录后从持久化数据加载一系列的设置
        dispatch("load");
        resolve();
        reject("err");
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
        //     // 设置 vuex 用户信息
        //     await dispatch("store/user/set", resp.userInfo, { root: true });
        //     // 用户登录后从持久化数据加载一系列的设置
        //     await dispatch("load");
        //     // 结束
        //     resolve();
        //   })
        //   .catch((err) => {
        //     console.log("err: ", err);
        //     reject(err);
        //   });
      });
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} param context
     * @param {Object} param vm {Object} vue 实例
     * @param {Object} param confirm {Boolean} 是否需要确认
     */
    logout({ commit, dispatch }, { vm, confirm = false }) {
      /**
       * @description 注销
       */
      async function webLogout() {
        // let logoutParams = {
        //   token: util.cookies.get("token"),
        //   uuid: util.cookies.get("uuid"),
        // };
        // logout(logoutParams).then((resp) => {
        //   console.log(resp);
        // });
        // 删除cookie
        util.cookies.remove("token");
        util.cookies.remove("uuid");
        // 清空 vuex 用户信息
        await dispatch("store/user/set", {}, { root: true });
        // 跳转路由
        vm.$router.push({
          name: "login",
        });
      }
      // 判断是否需要确认
      if (confirm) {
        commit("store/gray/set", true, { root: true });
        vm.$confirm("注销当前账户吗?  打开的标签页和用户设置将会被保存。", "确认操作", {
          confirmButtonText: "确定注销",
          cancelButtonText: "放弃",
          type: "warning",
        })
          .then(() => {
            commit("store/gray/set", false, { root: true });
            webLogout();
          })
          .catch(() => {
            commit("store/gray/set", false, { root: true });
            vm.$message("放弃注销用户");
          });
      } else {
        webLogout();
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} state vuex state
     */
    async load({ dispatch }) {
      // DB -> store 加载用户名
      await dispatch("store/user/load", null, { root: true });
      // DB -> store 持久化数据加载全局尺寸
      await dispatch("store/size/load", null, { root: true });
    },
  },
};
