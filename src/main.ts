import { createApp } from "vue";
import { VueFire, VueFireAuth } from "vuefire";
import App from "./App.vue";
import router from "./router";
import Swetrix, { type SwetrixVuePluginOptions } from "swetrix-vue";

import { firebaseApp } from "./firebase";

import "./styles/main.scss";

const app = createApp(App);

app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

const swetrixOpts: SwetrixVuePluginOptions = {
  pid: "dgNwCz7RR0P4",
  initOptions: {
    apiURL: "https://analytics-api.bmk.dev/log",
  },
};

app.use(Swetrix, swetrixOpts);

app.mount("#app");
