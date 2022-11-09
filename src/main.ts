import { createApp } from "vue";
import App from "./App.vue";
//重置浏览器的样式
import "normalize.css";
//注册所有图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./assets/css/index.less";

import router from "./router";
import store from "./store";
import { registerApp } from "./global";
import { setupStore } from "./store";

//全局引入
// import ElementPlus from 'element-plus'
// 引入elementplus样式
// import 'element-plus/theme-chalk/index.css'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

//use可以直接传入app
app.use(registerApp);
app.use(store);
setupStore(); //注册路由
app.use(router); //调用Install() ->获取当前页面path ->匹配router.routes ->这时routes无数据

app.mount("#app");
// console.log(process.env.VUE_APP_BASE_URL)

// fyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的response')
//       return res
//     }
//   }
// })
// interface DataType {
//   data: any,
//   returnCode: string,
//   success:boolean
// }
// fyRequest.request<DataType>({
//   url: '/home/multidata',
//   method: 'GET',
//   showLoading:false
// }).then((res) => {
//   console.log(res.data)
//   console.log(res.returnCode)
//   console.log(res.success)
// })
