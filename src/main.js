import Vue from 'vue'
import App from './App.vue'
// 注册全局组件--三级联动组件
import TypeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination';
import { Button, MessageBox  } from 'element-ui';

// 参数：1，组件名字，2，哪个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
// ele注册为全局组件
Vue.component(Button.name, Button);
// ele注册组件，还可以挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from '@/router';

// 引入仓库
import store from '@/store';

// // 测试
// import {reqCategoryList} from '@/api'
// reqCategoryList()

// 引入mockServe.js,mock模拟的数据
import "@/mock/mockServe"

//引入swiper的css
import "swiper/css/swiper.css"


// 统一接受api文件夹里面的所有请求函数
// 统一引入
import * as API  from '@/api';

import imgLazy from '@/assets/logo.png'
// 引入插件
import VueLazyload from 'vue-lazyload'
// 使用插件
Vue.use(VueLazyload,{
  loading:imgLazy
})

// 引入表单验证插件
import "@/utils/validate";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 配置全局事件总线$bus
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由，kv一致省略v【router小写】
  // 让全部组件获得$route和$router属性
  router,
  // 注册仓库，组件实例会多一个$store属性
  store
}).$mount('#app')
