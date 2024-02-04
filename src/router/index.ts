import { createRouter, createWebHistory, RouterOptions } from "vue-router";
import Dashboard from "../components/pages/Dashboard.vue";
import HomeView from "../components/pages/HomeView.vue";
import DriverView from "../components/pages/DriverView.vue";
import EmployeeView from "../components/pages/Employees.vue";
import Login from "../components/pages/Login.vue";
import ShiftRequests from "../components/pages/ShiftRequests.vue";
import store from "../store/index.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Dashboard",
      path: "/dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true, // 認証済の時のみ閲覧可能となるように定義
      },
    },
    {
      name: "Home",
      path: "/",
      component: HomeView,
      meta: {
        requiresAuth: true, // 認証済の時のみ閲覧可能となるように定義
      },
    },
    {
      name: "Driver",
      path: "/driver",
      component: DriverView,
      meta: {
        requiresAuth: true, // 認証済の時のみ閲覧可能となるように定義
      },
    },
    {
      name: "Employee",
      path: "/employee",
      component: EmployeeView,
      meta: {
        requiresAuth: true, // 認証済の時のみ閲覧可能となるように定義
      },
    },
    {
      name: "Request",
      path: "/request",
      component: ShiftRequests,
      meta: {
        requiresAuth: true, // 認証済の時のみ閲覧可能となるように定義
      },
    },
    { name: "Login", path: "/login", component: Login },
  ],
} as RouterOptions);

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters["user/isLogin"]) {
      console.log("ログイン画面に遷移します");
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
