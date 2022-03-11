import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/tailwind.css";
import "@/assets/fontawesome/css/all.css";
import router from "./router";
import axios from "axios";

const app = createApp(App).use(router);

const shit = axios.create({
  baseURL: "http://localhost/api",
  timeout: 1000,
  headers: { "Content-Type": "multipart/form-data" },
});
app.config.globalProperties.$req = shit;
async function fetchCats() {
  await shit.get("/categoryinfo.php").then(function (response) {
    app.config.globalProperties.$cat_list = response.data;
  });

  app.mount("#app");
}
fetchCats();
