import { App } from "vue";
//方式一：手动切换不同的环境(不推荐)
// const BASE_URL = 'http://coderwhy/org/dev'//开发环境
// const BASE_NAME = 'ttdd'

// const BASE_URL = 'http://coderwhy/org/prod'//生产环境
// const BASE_NAME = 'ttdd'

// const BASE_URL = 'http://coderwhy/org/dev'//测试环境
// const BASE_NAME = 'ttdd'

//方式二：process.env.NODE_ENV
//开发环境：development
//生产环境: production
//测试环境：test

let BASE_URL = "";
const TIME_OUT = 10000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://coderwhy.org/prod";
} else {
  BASE_URL = "http://coderwhy.org/test";
}

export { TIME_OUT, BASE_URL };

//方式三：创建.env.development .env.production .env.test文件
