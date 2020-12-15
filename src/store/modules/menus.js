import Storage from "@/libs/storage.js";

export default {
  namespaced: true,
  // 对数据的全局存储
  state: {
    menus: [], // medium small mini
  },
  // 获取声明的属性值，实时监听动态变化，对数据进行计算
  getters: {
    // fn(state, [params]) // 参数作为查询条件
    getMenus: (state) => {
      return state.menus;
    },
  },
  // 对数据的同步更改
  mutations: {
    menus(state, menus) {
      Storage.setSessionItem("menus", menus);
      state.menus = menus;
    },
  },
  // 对数据的异步更改
  actions: {
    commitMenus(context, menus) {
      context.commit("menus", menus);
    },
  },
};
