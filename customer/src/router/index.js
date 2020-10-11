import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import ('../views/Login.vue')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import ('../views/Edit.vue')
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import ('../views/Add.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if (to.path === '/login') {
    next();
  } else {
    let info = localStorage.getItem('user');
 
    if (!info) {
      next('/login');
    } else {
      next();
    }
  }
})

export default router
