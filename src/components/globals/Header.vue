<template>
  <div id="nav" v-if="isLogin">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <a @click="logout()">Logout</a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["isLogin"]),
  },
  methods: {
    async logout() {
      await this.$store.commit("user/resetState");
      await this.$store.commit("csrf/resetState");
      if (this.$route.meta.requiresAuth) {
        this.$router.push({
          path: "/login",
          query: { redirect: this.$route.fullPath },
        });
      }
    },
  },
};
</script>

<style scoped>
#nav {
  text-align: center;
  margin-bottom: 20px;
}
</style>
