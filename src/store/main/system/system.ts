import { Module } from "vuex";
import { IRootState } from "./../../type";
import { ISystemState } from "./type";
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData,
} from "@/service/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsCount: 0,
      goodsList: [],
      menuList: [],
      menuCount: 0,
    };
  },
  mutations: {
    changeUserslist(state, userList: []) {
      state.usersList = userList;
      console.log(userList);
    },
    changeUserscount(state, userCount: number) {
      state.usersCount = userCount;
    },
    changeRolelist(state, roleList: []) {
      state.roleList = roleList;
    },
    changeRolecount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    changeGoodslist(state, goodsList: []) {
      state.goodsList = goodsList;
    },
    changeGoodscount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeMenulist(state, menuList: []) {
      state.menuList = menuList;
    },
    changeMenucount(state, menuCount: number) {
      state.menuCount = menuCount;
    },
  },
  getters: {
    getPageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //     break
        //   case 'role':
        //     return state.roleList
        //     break
        // }
      };
    },
    getPageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    },
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }
      //1.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);

      // console.log(pageResult)
      //解构
      const { list, totalCount } = pageResult.data;

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);

      commit(`change${changePageName}list`, list);
      commit(`change${changePageName}count`, totalCount);

      // switch (pageName) {
      //   case 'users':
      //     commit('changeUserslist', list)
      //     commit('changeUserscount', totalCount)
      //     break
      //   case 'role':
      //     commit('changeRolelist', list)
      //     commit('changeRolecount',totalCount)
      //     break
      //}
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      //1.pageName-> /users
      //2.id->/users/id
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      //2.调用删除的网络请求
      await deletePageData(pageUrl);
      console.log(1);

      //3.重新请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    async createPageDataAction({ dispatch }, payload) {
      //1.创建数据的请求
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
      //2.请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    async editPageDataAction({ dispatch }, payload) {
      //1.编辑数据的请求
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);
      //2.请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
  },
};

export default systemModule;
