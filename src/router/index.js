import { createRouter, createWebHistory } from "vue-router";
import { useGeneralStore } from "../stores/useGeneral";
import { storeToRefs } from "pinia";

import HomePage from "@/pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/LoginPage.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("@/pages/SignupPage.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const generalStore = useGeneralStore();
  if (to.name !== "login" && to.name !== "signup" && !generalStore.user) {
    next({ name: "login" });
  } else {
    next();
  }
});
export default router;
