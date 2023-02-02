import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
//使用插件
Vue.use(VueRouter);

// 引入store
import store from '@/store';

// 先把VueRouter原型对象上的push，备份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push和replace
// 第一参数：告诉原来push方法，往哪里跳转，携带的参数
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call和apply的区别
        // 相同点；都可以调用函数一次，篡改函数上下文一次，改变this指向
        // 不同点：传递参数，call参数用逗号隔开，apply传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
});

// 全局守卫：前置守卫（路由跳转前）
router.beforeEach(async (to, from, next) => {
    next();
    // 登陆有token
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    // 已经登陆
    if (token) {
        // 登陆后去登陆页面，转到首页
        if (to.path == '/login') {
            next('/home');
        } else {
            // 登陆后去其他路由，有用户信息，全部放行
            if (name) {
                next();
            } else {
                // 没有用户信息，派发action再跳转
                try {
                    // 获取用户信息，然后放行
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    // 派发action，获取不到用户信息，token失效了
                    // 清除token，重新登陆
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        // 未登陆，不能去交易相关，支付相关，个人中心路由，转到登陆页
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // 把未去的路由存在地址栏中，query参数
            next('/login?redirect='+toPath);
        } else {
            next();
        }

    }
});

export default router;