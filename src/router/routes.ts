import type { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/add",
    name: "add",
    component: () => import("@/views/AddView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/add/success",
    name: "add-success",
    component: () => import("@/views/AddSuccessView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/list",
    name: "list",
    component: () => import("@/views/ListView.vue"),
  },
];

export default routes;
