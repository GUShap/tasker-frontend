import Vue from 'vue'
import VueRouter from 'vue-router'
import landingPage from '../App.vue'
import about from '../pages/about.vue'
import workspace from '../pages/workspace.vue'
import dashboard from '../pages/dashboard.vue'
import user from '../pages/user.vue'
import login from '../pages/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing-page',
    component: landingPage
  },
  {
    path: '/about',
    name: 'about',
    component: about
  },
  {
    path: 'home/board/:boardId?',
    name: 'workspace',
    component: workspace
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
