import Vue from "vue";
import VueRouter from "vue-router";

// 进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 日志等打印
import util from "@/libs/util";

// 路由数据，真是个奇葩的东西，不能命名为router相关的
import routes from "./routes";

// 解决路由异常，此问题不会导致出错但是控制台会有异常信息
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error);
};
const routerReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch((error) => error);
};

Vue.use(VueRouter);

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  mode: process.env.NODE_ENV === "production" ? "history" : "hash",
  routes,
});

/**
 * 路由拦截
 * 权限验证
 * 1、判断路由是否存在
 * 2、判断路由是否需要权限
 * 3、判断路由tooken是否过期
 */
const ROUTER_LOGIN = "login";
// 可以随着后期动态添加
const WHITELIST = ["login", "register", "404"];
// const ROUTER_REGISTER = "register";
router.beforeEach(async (to, from, next) => {
  // await store.dispatch('system/config')
  // 进度条
  NProgress.start();
  // 验证当前路由所有的匹配中是否需要有登录验证的
  // 这里暂时将cookie里是否存有token作为验证是否登录的条件
  // 请根据自身业务需要修改 发送请求校验session是否到期
  const token = util.cookies.get("token");
  // 白名单的无需经过任何判断直接next
  if (WHITELIST.includes(to.path.replaceAll("/", ""))) {
    next();
    NProgress.done();
  } else if (!token || token === "undefined") {
    // 如果不存在token，那么此时需要跳转登录页面
    next({
      name: ROUTER_LOGIN,
      query: {
        redirect: to.fullPath,
      },
    });
    NProgress.done();
  } else {
    // 动态路由处理
    next();
    NProgress.done();
  }
  //   // if (to.matched.length === 0) {
  //   //   // 匹配路由是否存在
  //   //   next({
  //   //     name: "404",
  //   //   });
  //   //   NProgress.done();
  //   // } else {
  //   //   if (to.matched.some((r) => r.meta.auth)) {
  //   //     next();
  //   //     NProgress.done();
  //   //   } else {
  //   //     // 不需要身份校验 直接通过
  //   //     next();
  //   //     NProgress.done();
  //   //   }
  //   // }
});

router.afterEach((to) => {
  // 更改标题
  util.title(to.meta.title);
  // 进度条
  NProgress.done();
});

export default router;