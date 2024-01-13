import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";
import "./index.css";
import store, { key } from "./store/index.ts";

const app = createApp(App);

app.use(router);
app.use(store, key);
// app.use(axios);
app.mount("#app");
