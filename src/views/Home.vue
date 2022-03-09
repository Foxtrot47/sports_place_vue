<template>
  <div
    class="bg-gray-100 h-full overflow-y-scroll dark:bg-gray-800 dark:text-white static"
  >
    <Navbar />
    <div class="flex flex-col gap-y-4 mx-4 py-4">
      <div
        v-if="!loggedIn"
        class="flex flex-row justify-center bg-white py-6 gap-x-4 items-center"
      >
        <p class="font-semibold font-product-sans text-2xl">Welcome!</p>
        <p class="text-gray-500 text-xl">Sign in for the best experience</p>
        <p class="text-blue-500 font-semibold text-xl font-product-sans">
          <router-link to="/users/login"> Sign in </router-link>
        </p>
        <p class="text-gray-500 text-xl">|</p>
        <p class="text-blue-500 font-semibold text-xl font-product-sans">
          <router-link to="/users/signup">Create Account </router-link>
        </p>
      </div>
      <div class="flex flex-col bg-white py-4 px-4 gap-y-4 relative">
        <span class="text-2xl font-semibold"> Football </span>
        <div
          class="bg-gray-500 absolute left-0 top-1/2 z-10 rounded-full p-2 px-4 text-white shadow left-scroll-button"
        >
          &lt;
        </div>
        <div
          class="bg-gray-500 absolute top-1/2 right-0 z-10 rounded-full p-2 px-4 text-white shadow right-scroll-button"
        >
          &gt;
        </div>
        <div class="flex flex-row gap-x-6 overflow-x-hidden">
          <div v-for="product in footballProducts" :key="product">
            <router-link :to="`/product/${product.product_id}`">
              <div class="flex flex-col items-center">
                <img :src="product.product_main_image" class="w-44" />
                <span class="w-56 truncate overflow-hidden">{{
                  product.product_full_name
                }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="flex flex-col bg-white py-4 px-4 gap-y-4 relative">
        <span class="text-2xl font-semibold"> BasketBall </span>
        <div
          class="bg-gray-500 absolute left-0 top-1/2 z-10 rounded-full p-2 px-4 text-white shadow left-scroll-button"
        >
          &lt;
        </div>
        <div
          class="bg-gray-500 absolute top-1/2 right-0 z-10 rounded-full p-2 px-4 text-white shadow right-scroll-button"
        >
          &gt;
        </div>
        <div class="flex flex-row gap-x-6 overflow-x-hidden">
          <div v-for="product in basketBallProducts" :key="product">
            <router-link :to="`/product/${product.product_id}`">
              <div class="flex flex-col items-center">
                <img :src="product.product_main_image" class="w-44" />
                <span class="w-56 truncate overflow-hidden">{{
                  product.product_full_name
                }}</span>
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="flex flex-col bg-white py-4 px-4 gap-y-4 relative">
        <span class="text-2xl font-semibold"> Browse by Category </span>
        <div
          class="bg-gray-500 absolute left-0 top-1/2 z-10 rounded-full p-2 px-4 text-white shadow left-scroll-button"
        >
          &lt;
        </div>
        <div
          class="bg-gray-500 absolute top-1/2 right-0 z-10 rounded-full p-2 px-4 text-white shadow right-scroll-button"
        >
          &gt;
        </div>
        <div class="flex flex-row gap-x-4 overflow-x-hidden">
          <div v-for="category in subCatList" :key="category" class="flex-none">
            <router-link :to="`/search?subcat_id=${category.subcatid}`">
              <img :src="category.subcat_pic" class="w-96" alt="bs" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Home",
  data() {
    return {
      footballProducts: {},
      basketBallProducts: {},
      subCatList: [],
      loggedIn: false,
    };
  },
  components: {
    Navbar,
  },
  mounted() {
    this.fetchProducts();
    this.subCatList = this.$cat_list["subcategories"];

    // Setting up left and right scroll buttons
    const leftScrollButton =
      document.getElementsByClassName("left-scroll-button");
    const rightScrollButton = document.getElementsByClassName(
      "right-scroll-button"
    );
    var i;
    for (i = 0; i < leftScrollButton.length; i++) {
      leftScrollButton[i].addEventListener("click", function () {
        this.parentElement.lastChild.scrollLeft -= 300;
      });
    }
    for (i = 0; i < rightScrollButton.length; i++) {
      rightScrollButton[i].addEventListener("click", function () {
        this.parentElement.lastChild.scrollLeft += 300;
      });
    }
    // CHeck if user is logged in
    if (
      sessionStorage.getItem("user_session_token") != undefined &&
      sessionStorage.getItem("user_session_token") != ""
    ) {
      this.loggedIn = true;
    }
  },
  methods: {
    async fetchProducts() {
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append("subcatid", 3);
      // Fetch all user info
      await this.$axios({
        url: "http://localhost:80/sports_place/api/search.php",
        method: "post",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        component.footballProducts = response.data.product_list;
      });
      bodyFormData.append("subcatid", 2);
      // Fetch all user info
      await this.$axios({
        url: "http://localhost:80/sports_place/api/search.php",
        method: "post",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        component.basketBallProducts = response.data.product_list;
      });
    },
  },
};
</script>

<style></style>
