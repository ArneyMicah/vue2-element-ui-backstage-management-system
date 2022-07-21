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
      }
    ]
  }
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
