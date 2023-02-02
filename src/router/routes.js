//引入路由组件
// 引入二级路由

export default [
    {
        path: '/center',
        component:()=>import('@/pages/Center'),
        meta: { show: true },
        children: [
            {
                path: 'myorder',
                component: ()=>import('@/pages/Center/myOrder'),
            },
            {
                path: 'grouporder',
                component: ()=>import('@/pages/Center/groupOrder'),
            },
            {
                path: '/center',
                redirect: '/center/myorder',
            }
        ]
    },
    {
        path: '/paysuccess',
        component: ()=>import('@/pages/PaySuccess'),
        meta: { show: true }
    },
    {
        path: '/pay',
        component: ()=>import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter:(to,from,next)=>{
            if (from.path == "/trade"||"/pay") {
                next();
            } else {
                next(flase);
            }
        }
    },
    {
        path: '/trade',
        component: ()=>import('@/pages/Trade'),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须从购物车来
            if (from.path == "/shopcart"||"/trade") {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: '/shopcart',
        component: ()=>import('@/pages/ShopCart'),
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: ()=>import('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: '/detail/:skuid',
        component: ()=>import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: '/login',
        component: ()=>import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        component: ()=>import('@/pages/Register'),
        meta: { show: false }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta: { show: true }
    },
    //重定向，项目运行时，访问/，立马定向到首页
    {
        path: '*',
        redirect: '/Home'
    }
]