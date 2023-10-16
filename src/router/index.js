// TODO : routage
// https://github.com/dgloriaweb/vue-pinia/blob/main/src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../view/HomeView.vue'
import PersonList from '../components/PersonList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: PersonList
  },
  {
    path: '/person',
    name: 'person',
    component: () => import( '../components/PersonList.vue')
  },
  {
    path: '/action',
    name: 'action',
    component: () => import( '../components/ActionList.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router