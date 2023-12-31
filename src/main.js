import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

import App from "./App.vue";
import router from "./router";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/tailwind.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
pinia.use(piniaPluginPersistedState)

app.use(router);
app.use(pinia);

app.mount("#app");
