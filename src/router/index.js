import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'Welcome'
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: () => import('../views/LoginPage/LoginPage.vue')
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: () => import('../views/HomePage/HomePage.vue'),
    children: [
      {
        path: '/Welcome',
        name: 'Welcome',
        component: () => import('../views/Welcome/Welcome.vue'),
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
