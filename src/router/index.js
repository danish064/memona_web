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
      path: "/staff",
      name: "staff",
      component: () => import("@/pages/UserHomePage.vue"),
    },
    {
      path: "/staff/fileComplaint",
      name: "fileComplaint",
      component: () => import("@/pages/staff/FileComplaintPage.vue"),
    },
    {
      path: "/staff/complaints",
      name: "staffComplaints",
      component: () => import("@/pages/staff/ComplaintsPage.vue"),
    },
    {
      path: "/staff/complaints/:id",
      name: "staffComplaint",
      component: () => import("@/pages/staff/ComplaintPage.vue"),
    },
    {
      path: "/technician",
      name: "technician",
      component: () => import("@/pages/TechnicianHomePage.vue"),
    },
    {
      path: "/technician/complaints",
      name: "technicianComplaints",
      component: () => import("@/pages/technician/ComplaintsPage.vue"),
    },
    {
      path: "/technician/complaints/:id",
      name: "technicianComplaint",
      component: () => import("@/pages/technician/ComplaintPage.vue"),
    },
    {
      path: "/technician/changeCategory",
      name: "changeCategory",
      component: () => import("@/pages/technician/ChangeCategoryPage.vue"),
    },
    {
      path: "/supervisor",
      name: "supervisor",
      component: () => import("@/pages/SupervisorHomePage.vue"),
    },
    {
      path: "/supervisor/complaints",
      name: "supervisorComplaints",
      component: () => import("@/pages/supervisor/ComplaintsPage.vue"),
    },
    {
      path: "/supervisor/complaints/:id",
      name: "supervisorComplaint",
      component: () => import("@/pages/supervisor/ComplaintPage.vue"),
    }
  ],
});
router.beforeEach((to, from, next) => {
  const { user } = useGeneralStore();
  if (!user) {
    if (to.name == "login" || to.name == "signup") {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    if (to.path == "/") {
      if (user.user_type == "staff") {
        next({ path: "/staff" });
      } else if (user.user_type == "technician") {
        next({ path: "/technician" });
      } else if (user.user_type == "supervisor") {
        next({ path: "/supervisor" });
      }
    } else if (
      user.user_type == "staff" &&
      (to.path.includes("/technician") || to.path.includes("/supervisor"))
    ) {
      next({ path: "/staff" });
    } else if (
      user.user_type == "technician" &&
      (to.path.includes("/staff") || to.path.includes("/supervisor"))
    ) {
      next({ path: "/technician" });
    } else if (
      user.user_type == "supervisor" &&
      (to.path.includes("/staff") || to.path.includes("/technician"))
    ) {
      next({ path: "/supervisor" });
    } else if (to.path == "/login" || to.path == "/signup") {
      next({ path: "/" });
    } else {
      next();
    }
    // if (user.user_type == "staff" && to.path == "/") {
    //   next({ path: "/staff" });
    // } else if (user.user_type == "technician" && to.path == "/") {
    //   next({ path: "/technician" });
    // } else {
    //   next();
    // }
  }
});
export default router;
