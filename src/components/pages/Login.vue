<script lang="ts">
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      msg: "",
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "user/isLogin",
      getMsg: "user/getMsg",
    }),
  },

  methods: {
    ...mapActions({
      loginAction: "user/login",
    }),
    async login() {
      await this.loginAction({
        username: this.username,
        password: this.password,
      });

      if (this.isLogin) {
        this.$router.push({
          path:
            typeof this.$route.query.redirect === "string"
              ? this.$route.query.redirect
              : "/",
        });
      }
    },
  },
};
</script>
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
            {{ getMsg }}
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-md-12">
            <button
              class="btn btn-info btn-block login"
              :disabled="!username || !password"
            >
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
