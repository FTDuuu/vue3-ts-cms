import axios from "axios";
import { withKeys } from "vue";

//axios实例对象
//4.axios配置选项 全局配置
axios.defaults.baseURL = "HTTP://httpbin.org";
axios.defaults.timeout = 10000;
//axios.defaults.headers={}

//1.模拟get请求
axios.get("http://123/207/32.32:8080/home/multidata").then((res) => {
  console.log(res.data);
});

//2.get请求，并且传入参数
axios
  .get("http://httpbin.org/get", {
    params: {
      name: "ttdd",
      age: 19,
    },
    //每个属性的配置
    timeout: 5000,
    headers: {},
  })
  .then((res) => {
    console.log(res.data);
  });

//3.post请求
axios.post("http://httpbin.org/post", {
  data: {
    name: withKeys,
    age: 19,
  },
});

//5.axios.all 多个请求 一起返回
axios
  .all([
    axios.get("/get", {
      params: {
        name: "ttdd",
        age: 19,
      },
    }),
    axios.post("/post", {
      data: {
        name: "ttdd",
        age: 19,
      },
    }),
  ])
  .then((res) => {
    console.log(res[0].data), console.log(res[1].data);
  });

//6.axios的拦截器
//(1)请求拦截
//fn1:请求发送成功会执行的函数
//fn2:请求发送失败会执行的函数
// axios.interceptors.request.use(fn1,fn2)
axios.interceptors.request.use(
  (config) => {
    //想做的操作
    //1.给请求添加token
    //2.isloading动画
    return config;
  },
  (err) => {
    console.log("请求发送错误");
    return err;
  }
);
//(2)响应拦截
//fn1:响应成功会执行的函数
//fn2:响应失败会执行的函数
// axios.interceptors.respone.use(fn1,fn2)
axios.interceptors.response.use(
  (res) => {
    console.log("响应成功的拦截");
    return res;
  },
  (err) => {
    console.log("响应失败的拦截");
    return err;
  }
);

//promise本身可以有类型
//new Promise<string>((resolve)=>{
//   resolve('abc')
// }).then((res)=>{
//   console.log(res.data)
// })
