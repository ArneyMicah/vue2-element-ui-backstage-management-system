import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'LoginPage'
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    meta:{
      title: "登录页面"
    },
    component: () => import('../views/LoginPage/LoginPage.vue')
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    meta:{
      title: "首页页面"
    },
    component: () => import('../views/HomePage/HomePage.vue'),
    children: [
      {
        path: '/WelcomePage',
        name: 'WelcomePage',
        meta:{
          title: "欢迎页面"
        },
        component: () => import('../views/WelcomePage/WelcomePage.vue'),
      },
      {
        path: '/users',
        name: 'users',
        meta:{
          title: "用户管理"
        },
        component: () => import('../views/Users/Users.vue'),
      },
      {
        path: '/roles',
        name: 'roles',
        meta:{
          title: "角色列表"
        },
        component: () => import('../views/Roles/Roles.vue'),
      },
      {
        path: '/rights',
        name: 'rights',
        meta:{
          title: "权限列表"
        },
        component: () => import('../views/Rights/Rights.vue'),
      },
      {
        path: '/goods',
        name: 'goods',
        meta:{
          title: "商品列表"
        },
        component: () => import('../views/Goods/Goods.vue'),
      },
      {
        path: '/params',
        name: 'params',
        meta:{
          title: "分类参数"
        },
        component: () => import('../views/Params/Params.vue'),
      },
      {
        path: '/categories',
        name: 'categories',
        meta:{
          title: "商品分类"
        },
        component: () => import('../views/Categories/Categories.vue'),
      },
      {
        path: '/orders',
        name: 'orders',
        meta:{
          title: "订单列表"
        },
        component: () => import('../views/Orders/Orders.vue'),
      },
      {
        path: '/reports',
        name: 'reports',
        meta:{
          title: "数据报表"
        },
        component: () => import('../views/Reports/Reports.vue'),
      },
      {
        path: '/AddGoodsPage',
        name: 'AddGoodsPage',
        meta:{
          title: "添加商品"
        },
        component: () => import('../views/AddGoodsPage/AddGoodsPage.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let token = localStorage.getItem('token')
  if(token){
    next()
  }else{
    if(to.path == '/LoginPage'){
      next()
    }else{
      next("/LoginPage")
    }
  }
})
export default router
