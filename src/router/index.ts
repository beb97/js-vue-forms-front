// TODO : routage
// https://github.com/dgloriaweb/vue-pinia/blob/main/src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import ActionList from "@/pages/action/ActionList.vue";

const routes = [
  {
    path: "/structure/:id",
    name: "structureInfo",
    component: () => import("@/pages/structure/StructureInfo.vue"),
    props: {
      type: [Number, String],
      required: true,
    },
  },
  {
    path: "/person/:id",
    name: "personInfo",
    component: () => import("@/pages/person/PersonInfo.vue"),
    props: {
      type: [Number, String],
      required: true,
    },
  },
  {
    path: "/action/:id",
    name: "actionInfo",
    component: () => import("@/pages/action/ActionInfo.vue"),
    props: {
      type: [Number, String],
      required: true,
    },
  },
  {
    path: "/person",
    name: "person",
    component: () => import("@/pages/person/PersonList.vue"),
  },
  {
    path: "/action",
    name: "action",
    component: () => import("@/pages/action/ActionList.vue"),
  },
  {
    path: "/structure",
    name: "structure",
    component: () => import("@/pages/structure/StructureList.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/pages/NotFound.vue"),
  },
  {
    path: "/",
    name: "home",
    component: ActionList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
