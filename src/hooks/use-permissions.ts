import { useStore } from "@/store";

export function usePermisson(pageName: any, handleName: string) {
  const store = useStore();
  const permissions = store.state.login.permissions;
  const verifyPermission = `system:${pageName}:${handleName}`;
  //返回的是布尔值 !能转化为布尔值 然后再进行取反
  return !!permissions.find((item) => item === verifyPermission);
}
