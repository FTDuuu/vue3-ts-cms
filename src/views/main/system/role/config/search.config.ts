import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
  itemStyle: { padding: "20px 10px" },
  formItems: [
    {
      field: "name",
      type: "input",
      label: "id",
      placeholder: "请输入用户名",
    },
    {
      field: "intro",
      type: "input",
      label: "权限介绍",
      placeholder: "请插入权限介绍",
    },
    {
      field: "createTime",
      type: "datepicker",
      label: "创建时间",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange",
      },
    },
  ],
};
