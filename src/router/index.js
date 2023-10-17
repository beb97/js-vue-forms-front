// TODO : routage
// https://github.com/dgloriaweb/vue-pinia/blob/main/src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../view/HomeView.vue'
import PersonList from "../pages/person/PersonList.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: PersonList,
  },
  {
    path: "/person",
    name: "person",
    component: () => import("../pages/person/PersonList.vue"),
  },
  {
    path: "/action",
    name: "action",
    component: () => import("../pages/action/ActionList.vue"),
  },
  {
    path: "/structure",
    name: "structure",
    component: () => import("../pages/structure/StructureList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
