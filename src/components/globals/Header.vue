<template>
  <!-- <nav class="w-full bg-red-200" id="nav" v-if="isLogin"> -->
  <!-- <div class="flex justify-between bg-blue-200 max-w-5xl mx-auto">

    </div> -->
  <!-- </nav> -->
  <header class="text-gray-600 body-font bg-red-400" v-if="isLogin" id="nav">
    <div
      class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center"
    >
      <a
        class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          ></path>
        </svg>
        <span class="ml-3 text-xl">シフト自動生成</span>
      </a>
      <nav
        class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center"
      >
        <router-link class="mr-5 hover:text-gray-900" to="/">Home</router-link>
        <router-link class="mr-5 hover:text-gray-900" to="/driver"
          >Driver</router-link
        >
        <router-link class="mr-5 hover:text-gray-900" to="/employee"
          >Employee</router-link
        >
      </nav>
      <button
        class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
        @click="logout()"
      >
        ログアウト
        <!-- <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg> -->
      </button>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("user", ["isLogin"]),
  },
  methods: {
    async logout() {
      this.$store.commit("user/resetState");
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
