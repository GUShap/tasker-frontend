import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/home.vue'
import about from '../pages/about.vue'
import board from '../pages/tasker-app.vue'
import dashboard from '../pages/dashboard.vue'
import user from '../pages/user.vue'
import login from '../pages/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: '/board/:boardId?',
    name: 'board',
    component: board
  },
 {        //check if same id as board-id
    path: '/dashboard/:boardId?',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/user/:userId?',
    name: 'user',
    component: user
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },

]

const router = new VueRouter({
  routes
})

export default router
