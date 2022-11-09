import LocalCache from "@/utils/cache";
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { firstMenu } from "@/utils/map-menus";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    //路由懒加载 即在需要时进行加载
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
  },
  {
    //匹配路径
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/not-found/not-found.vue"),
  },
];
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = LocalCache.getCache("token");
    if (!token) {
      return "/login";
    }
  }
  //显示第一个Menu
  if (to.path === "/main") {
    return firstMenu.url;
  }
  // console.log(router.getRoutes())
  // console.log(to) to的name是undefined
});

export default router;
