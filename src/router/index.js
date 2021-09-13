import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Form',
    component: () => import(/* webpackChunkName: "about" */ '../views/Form.vue')
  },
  {
    path: '/system/auth/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '../views/system/auth/user.vue')
  },
  {
    path: '/system/menus',
    name: 'menus',
    component: () => import(/* webpackChunkName: "about" */ '../views/system/menus.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
