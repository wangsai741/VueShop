// 引入mock模块
import Mock from "mockjs";
// 把json数据格式引入
// webpack默认对外暴露：图片，JSON数据格式
import banner from "./banner.json"
import floor from "./floor.json"

// mock数据，参数第一个：请求地址，第二个：请求数据
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock("/mock/floor",{code:200,data:floor});