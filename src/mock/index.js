import Mock from "mockjs";
import baseURL from "@/api/index";

Mock.setup({
  timeout: "200-600",
});

export const random = () => {
  return Math.floor(Math.random() * 10000000);
};

Mock.mock(baseURL.login, "post", () => {
  return { token: random(), uuid: random() };
});

Mock.mock(baseURL.logout, "post", () => {
  return { token: random(), uuid: random() };
});
Mock.mock(baseURL.getUserInfo, "post", () => {
  const menus = [
    {
      id: 1,
      orderNum: 1,
      type: 1,
      name: "首页",
      title: "首页",
      path: "home",
      component: "Home",
      redirect: "",
      icon: "el-icon-location",
      isLink: 0,
      isCache: 0,
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
      path: "",
      component: "",
      redirect: "",
      icon: "el-icon-location",
      isLink: 0,
      isCache: 0,
      isDisable: 1,
      isSideMenu: 1,
      status: 1,
      perms: "admin:system:*",
      children: [
        {
          id: 21,
          orderNum: 1,
          type: 1,
          name: "RG图形",
          title: "RG图形",
          path: "relation-graph",
          component: "test/RelationGraph",
          redirect: "",
          icon: "el-icon-location",
          isLink: 0,
          isCache: 0,
          isDisable: 1,
          isSideMenu: 1,
          status: 1,
          perms: "admin:system:*",
        },
        {
          id: 22,
          orderNum: 1,
          type: 1,
          name: "AmCharts4FD",
          title: "AmCharts4FD",
          path: "a4-force-directed",
          component: "test/A4ForceDirected",
          redirect: "",
          icon: "el-icon-location",
          isLink: 0,
          isCache: 0,
          isDisable: 1,
          isSideMenu: 1,
          status: 1,
          perms: "admin:system:*",
        },
      ],
    },
    {
      id: 9,
      orderNum: 3,
      type: 0,
      name: "系统管理",
      title: "系统管理",
      path: "system",
      component: "",
      redirect: "",
      icon: "el-icon-location",
      isLink: 0,
      isCache: 0,
      isDisable: 1,
      isSideMenu: 1,
      status: 1,
      perms: "admin:system:*",
      children: [
        {
          id: 91,
          orderNum: 1,
          type: 1,
          name: "用户管理",
          title: "用户管理",
          path: "users",
          component: "system/Users",
          redirect: "",
          icon: "el-icon-location",
          isLink: 0,
          isCache: 0,
          isDisable: 1,
          isSideMenu: 1,
          status: 1,
          perms: "admin:system:*",
        },
        {
          id: 92,
          orderNum: 2,
          type: 1,
          name: "角色管理",
          title: "角色管理",
          path: "roles",
          component: "system/Roles",
          redirect: "",
          icon: "el-icon-location",
          isLink: 0,
          isCache: 0,
          isDisable: 1,
          isSideMenu: 1,
          status: 1,
          perms: "admin:system:*",
        },
        {
          id: 93,
          orderNum: 3,
          type: 1,
          name: "菜单管理",
          title: "菜单管理",
          path: "menus",
          component: "system/Menus",
          redirect: "",
          icon: "el-icon-location",
          isLink: 0,
          isCache: 0,
          isDisable: 1,
          isSideMenu: 1,
          status: 1,
          perms: "admin:system:*",
        },
        {
          id: 94,
          orderNum: 4,
          type: 1,
          name: "字典管理",
          title: "字典管理",
          path: "dictionary",
          component: "system/Dictionary",
          redirect: "",
          icon: "el-icon-location",
          isLink: 0,
          isCache: 0,
          isDisable: 1,
          isSideMenu: 1,
          status: 1,
          perms: "admin:system:*",
        },
        {
          id: 95,
          orderNum: 5,
          type: 1,
          name: "公司管理",
          title: "公司管理",
          path: "company",
          component: "system/Company",
          redirect: "",
          icon: "el-icon-location",
          isLink: 0,
          isCache: 0,
          isDisable: 1,
          isSideMenu: 1,
          status: 1,
          perms: "admin:system:*",
        },
        {
          id: 96,
          orderNum: 6,
          type: 1,
          name: "公司管理",
          title: "公司管理",
          path: "depts",
          component: "system/Depts",
          redirect: "",
          icon: "el-icon-location",
          isLink: 0,
          isCache: 0,
          isDisable: 1,
          isSideMenu: 1,
          status: 1,
          perms: "admin:system:*",
        },
      ],
    },
  ];
  return {
    name: "name",
    roles: [],
    permissions: [],
    menus: menus,
  };
});

export default Mock;
