<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/globals/Header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
