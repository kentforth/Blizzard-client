import { createApp } from "vue";
import App from "./App.vue";
import router from "./plugins/router";
import "./assets/scss/global.scss";
import VueApexCharts from "vue3-apexcharts";

createApp(App).use(router).use(VueApexCharts).mount("#app");
