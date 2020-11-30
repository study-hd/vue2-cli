import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "@/plugin/ui";
import "@/plugin/utils";
import "@/plugin/filters";

Vue.config.productionTip = false;

// 锚点
Vue.directive("anchor", {
  inserted: function (el, binding) {
    el.onclick = function () {
      document.documentElement.scrollTop = document.getElementById("anchor-" + binding.value).offset().top;
    };
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
