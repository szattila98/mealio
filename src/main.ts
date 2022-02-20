import { createApp } from "vue";
import { createPinia } from "pinia";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/tailwind-light/theme.css"; // theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import ToastService from "primevue/toastservice";
import Tooltip from "primevue/tooltip";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);

app.directive("tooltip", Tooltip);

app.mount("#app");
