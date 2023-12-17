import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/HomeView.vue";
import AboutView from "../components/AboutView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "Home", path: "/", component: HomeView },
    { name: "About", path: "/about", component: AboutView },
  ],
});

export default router;
