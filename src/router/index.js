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
router.beforeEach((to, from, next) => {
  // 进度条
  NProgress.start();
  // 验证当前路由所有的匹配中是否需要有登录验证的
  // 这里暂时将cookie里是否存有token作为验证是否登录的条件
  // 请根据自身业务需要修改 发送请求校验session是否到期
  const token = util.cookies.get("token");
  if (token && token !== "undefined") {
    // 动态新增路由
    if (to.matched.length === 0) {
      // 匹配路由是否存在
      next({
        name: "404",
      });
      NProgress.done();
    } else {
      if (to.matched.some((r) => r.meta.auth)) {
        next();
        NProgress.done();
      } else {
        // 不需要身份校验 直接通过
        next();
        NProgress.done();
      }
    }
  } else {
    // 没有登录的时候跳转到登录界面
    // 携带上登陆成功之后需要跳转的页面完整路径
    next({
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    });
    NProgress.done();
  }
});

router.afterEach((to) => {
  // 进度条
  NProgress.done();
  // 更改标题
  util.title(to.meta.title);
});

export default router;
