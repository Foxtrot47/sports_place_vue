import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "@/assets/tailwind.css";
import router from "./router";
import axios from "axios";

const app = createApp(App).use(router).use(store);

async function fetchCats() {
  await axios({
    url: "http://localhost:80/sports_place/api/categoryinfo.php",
    method: "get",
  }).then(function (response) {
    app.config.globalProperties.$cat_list = response.data;
  });
  app.config.globalProperties.$axios = axios;

  app.mount("#app");
}
fetchCats();
