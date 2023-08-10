import { createApp } from "vue";
import { createPinia } from "pinia";


import App from "./App.vue";
import router from "./router";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/tailwind.css";

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");
