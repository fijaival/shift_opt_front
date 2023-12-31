<template>
  <div class="login">
    <h2>Sign in</h2>
    <form @submit.prevent="login">
      <div class="container" style="width: 500px">
        <div class="row align-items-center">
          <div class="col-md-4">アカウント名</div>
          <div class="col-md-3">
            <input v-model="username" type="text" placeholder="ユーザ名" />
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-4">パスワード</div>
          <div class="col-md-3">
            <input
              v-model="password"
              type="password"
              placeholder="パスワード"
            />
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-12">
            {{ msg }}
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-12">
            <button class="btn btn-info btn-block login" :disabled="!username">
              ログイン
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>
<script lang="ts">
// import { useStore } from "@/store"; // Vuexストアをインポート

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      msg: "",
    };
  },

  methods: {
    async login() {
      const requestBody = { username: this.username, password: this.password };
      try {
        const response = await this.$axios.post("/auth/login", requestBody, {
          withCredentials: true,
        });
        console.log(response);
        const csrfAccessToken = response.headers["x-access-token-csrf"];
        const csrfRefreshToken = response.headers["x-refresh-token-csrf"];

        await this.$store.dispatch("csrf/saveCsrfAccessToken", csrfAccessToken);
        await this.$store.dispatch(
          "csrf/saveCsrfRefreshToken",
          csrfRefreshToken
        );
        await this.$store.dispatch("user/setUser", this.username);

        this.$router.push({
          path:
            typeof this.$route.query.redirect === "string"
              ? this.$route.query.redirect
              : "/",
        });
        this.msg = response.data.login;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
