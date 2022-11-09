import { ISystemState } from "./main/system/type";
import { ILoginState } from "./login/type";
import { IDashboardState } from "./main/analysis/type";

export interface IRootState {
  name: string;
  age: number;
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
}

//模块注册
export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
  dashboard: IDashboardState;
}

export type IStoreType = IRootState & IRootWithModule;
