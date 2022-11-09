export const rules1 = {
  name: [
    {
      required: true,
      message: "账号名是必传的",
      trigger: "blur", //失去焦点后验证
    },
    {
      pattern: /^[a-z0-9]{5,9}$/,
      message: "用户名必须是5—9的数字或者字母",
      tigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码是必传的",
      trigger: "blur",
    },
    {
      pattern: /^[a-z0-9]{3,}$/, //3位以上
      message: "用户名必须是3位以上的数字或者字母",
      tigger: "blur",
    },
  ],
};

export const rules2 = {
  num: [
    {
      required: true,
      message: "手机号是必传的",
      trigger: "blur", //失去焦点后验证
    },
    {
      pattern: /^[0-9]{13}$/,
      message: "用户名必须是13位的数字",
      tigger: "blur",
    },
  ],
  code: [
    {
      required: true,
      message: "验证码是必传的",
      trigger: "blur",
    },
    {
      pattern: /^[0-9]{5}$/, //3位以上
      message: "验证码必须是五位",
      tigger: "blur",
    },
  ],
};
