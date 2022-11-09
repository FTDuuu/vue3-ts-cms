import { LoadingInstance } from "element-plus/lib/components/loading/src/loading";
import { Module } from "vuex";

import { ILoginState } from "./type";
import { IRootState } from "./../type";
import { IAccount } from "@/service/login/type";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from "@/service/login/login";
import { mapMenusToPermissions, mapMenusToRoutes } from "@/utils/map-menus";
import LocalCache from "@/utils/cache";
import router from "@/router/index";

//Module<T,T>有两个泛型 一个是根泛型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: {},
      permissions: [],
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      // console.log(token)
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;

      //加载菜单的组件
      // const userMenus=(store.state as any).login.userMenus
      const routes = mapMenusToRoutes(userMenus);
      //把组件添加到菜单里面
      routes.forEach((route) => {
        //将routes=>ruter.main.children
        router.addRoute("main", route);
      });

      //获取用户按钮权限
      const permissions = mapMenusToPermissions(userMenus);
      state.permissions = permissions;
    },
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit("changeToken", token);
      //缓存token
      LocalCache.setCache("token", token);

      //发送初始化的请求（完整的role/department）
      //有token的时候初始化
      dispatch("getInitialDataAction", null, { root: true });

      //2.请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      // console.log(userInfo)
      commit("changeUserInfo", userInfo);
      LocalCache.setCache("userInfo", userInfo);

      //3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit("changeUserMenus", userMenus);
      LocalCache.setCache("userMenus", userMenus);

      //4.跳到首页
      router.push("/main");
    },
    //防止刷新后数据丢失为空保存
    loadLocalLogin({ commit, dispatch }) {
      const token = LocalCache.getCache("token");
      //发送初始化的请求（完整的role/department）
      //有token的时候初始化
      dispatch("getInitialDataAction", null, { root: true });
      if (token) {
        commit("changeToken", token);
      }
      const userInfo = LocalCache.getCache("userInfo");
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      const userMenus = LocalCache.getCache("userMenus");
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    },
    // phoneLoginAction({ commit }, payload: any) {
    //   console.log('执行phoneloginAction')
    // }
  },
};

export default loginModule;
