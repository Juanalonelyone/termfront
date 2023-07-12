import TabsView from "@/layouts/tabs/TabsView";
import BlankView from "@/layouts/BlankView";
import PageView from "@/layouts/PageView";

// 路由配置
const options = {
  routes: [
    {
      path: "/login",
      name: "登录页",
      component: () => import("@/pages/login"),
    },

    {
      path: "/",
      name: "首页",
      component: TabsView,
      redirect: "/login",
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          meta: {
            icon: "dashboard",
          },
          component: () => import("@/pages/dashboard/workplace"),
        },
        {
          path: "form",
          name: "事件记录",
          meta: {
            icon: "form",
            page: {
              cacheAble: false,
            },
          },
          component: () => import("@/pages/event/index"),
        },
        {
          path: "list",
          name: "老年人信息管理",
          meta: {
            icon: "table",
          },
          component: PageView,
          children: [
            {
              path: "query",
              name: "信息列表",
              meta: {
                authority: "queryForm",
              },
              component: () => import("@/pages/oldpeople/index"),
            },
            {
              path: "query/detail/:id",
              name: "详情",
              meta: {
                highlight: "/list/query",
                invisible: true,
              },
              component: () => import("@/pages/oldpeople/details"),
            },
            {
              path: "query/update/:id",
              name: "修改",
              meta: {
                highlight: "/list/query",
                invisible: true,
              },
              component: () => import("@/pages/oldpeople/update"),
            },
            {
              path: "primary",
              name: "统计分析",
              component: () => import("@/pages/dashboard/analysis/Analysis"),
            },
          ],
        },
        {
          path: "yuangong",
          name: "工作人员信息管理",
          meta: {
            icon: "profile",
          },
          component: PageView,
          children: [
            {
              path: "basic",
              name: "信息管理",
              component: () => import("@/pages/yuangong/index"),
            },
            {
              path: "basic/detail/:id",
              name: "详情",
              meta: {
                highlight: "/yuangong/basic",
                invisible: true,
              },
              component: () => import("@/pages/yuangong/details"),
            },
            {
              path: "basic/update/:id",
              name: "修改",
              meta: {
                highlight: "/yuangong/basic",
                invisible: true,
              },
              component: () => import("@/pages/yuangong/update"),
            },
            {
              path: "advance",
              name: "统计分析",
              component: () => import("@/pages/yuangong/analysis"),
            },
          ],
        },
        {
          path: "vol",
          name: "义工信息管理",
          meta: {
            icon: "check-circle-o",
          },
          component: PageView,
          children: [
            {
              path: "index",
              name: "信息列表",
              component: () => import("@/pages/yigong/index"),
            },
            {
              path: "index/detail/:id",
              name: "详情",
              meta: {
                highlight: "/result/success",
                invisible: true,
              },
              component: () => import("@/pages/yigong/details"),
            },
            {
              path: "index/update/:id",
              name: "修改",
              meta: {
                highlight: "/result/success",
                invisible: true,
              },
              component: () => import("@/pages/yigong/update"),
            },
            {
              path: "fenxi",
              name: "统计分析",
              component: () => import("@/pages/yigong/analysis"),
            },
          ],
        },
        {
          path: "exception",
          name: "系统管理",
          meta: {
            icon: "warning",
          },
          component: BlankView,
          children: [
            {
              path: "manage",
              name: "数据管理",
              component: () => import("@/pages/manage/index"),
            },
            {
              path: "video",
              name: "摄像头管理",
              component: () => import("@/pages/video/index"),
            },
          ],
        },

      ],
    },
  ],
};

export default options;
