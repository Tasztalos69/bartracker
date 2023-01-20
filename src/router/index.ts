import { createRouter, createWebHistory } from "vue-router";
import { getCurrentUser } from "vuefire";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {
        path: "/login",
        query: {
          redirectTo: to.fullPath,
        },
      };
    }
  }
});

export default router;
