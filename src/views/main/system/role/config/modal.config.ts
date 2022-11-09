import { IForm } from "@/base-ui/form";

export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "角色名",
      placeholder: "请输入用户名",
    },
    {
      field: "intro",
      type: "input",
      label: "电话号码",
      placeholder: "请输入电话号码",
    },
  ],
  colLayout: { span: 24 },
  itemStyle: {},
};
