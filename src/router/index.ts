import { createRouter, createWebHistory, RouterOptions } from "vue-router";
import HomeView from "../components/pages/HomeView.vue";
import AboutView from "../components/pages/AboutView.vue";
import Login from "../components/pages/Login.vue";
import store from "../store/index.ts";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: HomeView,
      meta: {
        requiresAuth: true, // 認証済の時のみ閲覧可能となるように定義
      },
    },
    {
      name: "About",
      path: "/about",
      component: AboutView,
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
      console.log("ewaf");
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
