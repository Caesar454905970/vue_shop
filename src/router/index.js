import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users.vue'
import Rights from '@/components/power/Rights.vue'
import Roles from '@/components/power/Roles.vue'
import Cate from '@/components/goods/Cate.vue'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      // 首页自动跳转
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect:'/home/welcome',
      children:[
        {
          path:'/home/welcome',
          component:Welcome
        },
        { path: '/home/users', component: Users },
        { path:'/home/rights',component:  Rights},
        { path:'/home/roles',component:  Roles},
        { path:'/home/categories',component:  Cate},

      ]
    },

  ]
})

// 挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if(to.path === '/login') return next()
  //先获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return  next('login')
  //token存在
  // 提交token给服务器，判断token是否有效，有效再。。或者 校验一下本地的token值（把初始值放在vuex里面)
  // 放行
  next()
})

export default router
