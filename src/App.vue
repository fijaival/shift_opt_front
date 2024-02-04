<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "./components/parts/Header.vue";
import TextArea from "./components/parts/TextArea.vue";
export default {
  components: {
    Header,
    TextArea,
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
