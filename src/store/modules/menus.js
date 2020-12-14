import Storage from "@/libs/storage.js";

export default {
  namespaced: true,
  // 对数据的全局存储
  state: {
    menu: {}, // medium small mini
  },
  // 获取声明的属性值，实时监听动态变化，对数据进行计算
  getters: {
    // fn(state, [params]) // 参数作为查询条件
    getMenu: (state) => {
      return state;
    },
  },
  // 对数据的同步更改
  mutations: {
    menu(state, menu) {
      Storage.setSessionItem("menu", menu);
      state.menu = menu;
    },
  },
  // 对数据的异步更改
  actions: {
    commitMenu(context) {
      context.commit("menu");
    },
  },
};
