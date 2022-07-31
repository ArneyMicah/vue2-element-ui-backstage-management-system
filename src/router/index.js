import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/LoginPage'
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    meta: {
      title: '登陆页面'
    },
    component: () => import('@/views/LoginPage/LoginPage.vue')
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/HomePage/HomePage.vue'),
    children: [
      {
        path: '/WelcomePage',
        name: 'WelcomePage',
        meta: {
          title: '欢迎页面'
        },
        component: () => import('@/views/WelcomePage/WelcomePage.vue')
      },
      {
        path: '/users',
        name: 'users',
        meta: {
          title: '用户管理-用户列表'
        },
        component: () => import('@/views/UsersPage/UsersPage.vue')
      },
      {
        path: '/roles',
        name: 'roles',
        meta: {
          title: '权限管理-角色列表'
        },
        component: () => import('@/views/RolesPage/RolesPage.vue')
      },
      {
        path: '/rights',
        name: 'rights',
        meta: {
          title: '权限管理-权限列表'
        },
        component: () => import('@/views/RolesPage/RightsPage.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        meta: {
          title: '商品管理-商品列表'
        },
        component: () => import('@/views/GoodsPage/GoodsPage.vue')
      },
      {
        path: '/AddGoodsList',
        name: 'AddGoodsList',
        meta: {
          title: '商品管理-添加商品'
        },
        component: () => import('@/views/GoodsPage/AddGoodsList.vue')
      },
      {
        path: '/params',
        name: 'params',
        meta: {
          title: '商品管理-分类参数'
        },
        component: () => import('@/views/GoodsPage/ParamsPage.vue')
      },
      {
        path: '/categories',
        name: 'categories',
        meta: {
          title: '商品管理-商品分类'
        },
        component: () => import('@/views/GoodsPage/CategoriesPage.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        meta: {
          title: '订单管理-订单列表'
        },
        component: () => import('@/views/OrdersPage/OrdersPage.vue')
      },
      {
        path: '/reports',
        name: 'reports',
        meta: {
          title: '数据统计-数据报表'
        },
        component: () => import('@/views/ReportsPage/ReportsPage.vue')
      }
    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if(sessionStorage.getItem("token")){
    next()
  }else{
    if(to.path == '/LoginPage'){
      next()
    }else{
      next("/LoginPage")
    }
  }
})
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default router
