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
    {
      path: "/staff/fileComplaint",
      name: "fileComplaint",
      component: () => import("@/pages/staff/FileComplaint.vue"),
    },
    {
      path: "/staff/complaints",
      name: "staffComplaints",
      component: () => import("@/pages/staff/Complaints.vue"),
    },
    {
      path: "/staff/complaints/:id",
      name: "staffComplaint",
      component: () => import("@/pages/staff/Complaint.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const generalStore = useGeneralStore();
  if (!generalStore.user) {
    if (to.name == "login" || to.name == "signup") {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});
export default router;
