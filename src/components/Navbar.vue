<template>
  <nav
    class="bg-white dark:bg-gray-900 shadow text-black dark:text-white top-0 pr-4 z-20 sticky backdrop-filter backdrop-blur-lg bg-opacity-60 border-b border-gray-200"
  >
    <div class="w-full py-2 mx-2">
      <div class="md:flex flex-row items-center md:justify-around gap-y-4">
        <div class="flex items-center flex-nowrap">
          <div class="text-xl font-semibold">
            <router-link
              class="text-2xl font-bold lg:text-4xl text-gray-700 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 font-product-sans"
              to="/"
              >The Sports Place</router-link
            >
          </div>
        </div>
        <div class="w-1/2 h-10 ml-3">
          <input
            type="text"
            name="product_name"
            class="outline-none rounded-full bg-gray-200 h-full p-2 dark:bg-gray-600"
            style="width: 100%"
            v-model="SearchKeyword"
            v-on:keypress.enter="search()"
            placeholder="Seach for products and more"
          />
        </div>
        <div v-if="session_token" class="relative ml-20 inline-block dropdown">
          <button
            class="flex flex-row items-center w-12 h-12 ml-4 rounded-full"
          >
            <img :src="profile_pic" class="rounded-full w-16" alt="avatar" />
          </button>
          <div
            class="hidden absolute z-10 left-0 w-full pt-4 origin-top-right rounded-md md:w-64 dropdown-content"
          >
            <div class="bg-white rounded-md shadow-lg dark:bg-gray-900">
              <router-link
                class="block px-3 py-3 mt-2 text-md text-semibold rounded-md dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                to="/users/profile"
              >
                <svg
                  class="inline"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
                My Profile</router-link
              >
              <hr class="dark:border-gray-600" />
              <router-link
                class="block px-3 py-3 mt-2 text-md text-semibold rounded-md dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                to="/users/orders"
              >
                <svg
                  class="inline"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path
                    d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                  />
                </svg>
                My Orders</router-link
              >
              <hr class="dark:border-gray-600" />
              <button
                @click="this.logout()"
                class="block px-3 py-3 mt-2 text-md text-semibold rounded-md dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
              >
                <svg
                  class="inline"
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <g><path d="M0,0h24v24H0V0z" fill="none" /></g>
                  <g>
                    <path
                      d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"
                    />
                  </g>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        <div v-else class="flex items-center py-2 -mx-1 md:mx-0">
          <router-link
            class="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-gray-500 rounded-md hover:bg-blue-600 md:mx-2 md:w-auto"
            to="/users/login"
            >Login</router-link
          >
          <router-link
            class="block w-1/2 px-3 py-2 mx-1 text-sm font-medium leading-5 text-center text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 md:mx-0 md:w-auto"
            to="/users/signup"
            >Signup</router-link
          >
        </div>
        <div v-if="session_token">
          <router-link
            to="/users/cart/"
            class="text-2xl relative font-product-sans flex flex-row items-center justify-center"
          >
            <i class="fa-light fa-cart-shopping pr-2"></i>
            Cart
            <span
              v-if="ItemsinCart > 0"
              class="items-center justify-center px-1 text-xs text-red-100 bg-red-600 rounded-full absolute top-0 left-0"
            >
              {{ ItemsinCart }}
            </span>
          </router-link>
        </div>
        <div class="relative inline-block dropdown flex flex-row items-center">
          <span class="text-2xl font-product-sans"
            >More<span class="text-xs font-semibold pl-2">&#11206;</span></span
          >
          <div
            class="hidden absolute z-10 right-0 top-8 pt-4 rounded-md w-36 dropdown-content"
          >
            <div
              class="bg-white rounded-md shadow-lg dark:bg-gray-900 flex flex-col"
            >
              <router-link
                class="block px-3 py-3 mt-2 text-md text-semibold rounded-md dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                to="/sellers/mylistings"
              >
                <i class="fa-solid fa-bag-shopping"></i>
                Sell here</router-link
              >
              <router-link
                class="block px-3 py-3 mt-2 text-md text-semibold rounded-md dark:hover:bg-gray-600 dark:hover:text-white dark:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                to="/admin/login"
              >
                <i class="fa-solid fa-user-police"></i>
                Admin Login</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "DefaultNavbar",
  data() {
    return {
      session_token: "",
      ItemsinCart: 0,
      profile_pic: "",
      SearchKeyword: this.search_keyword,
    };
  },
  props: ["search_keyword"],
  mounted() {
    this.session_token = sessionStorage.getItem("user_session_token");
    this.profile_pic = sessionStorage.getItem("user_profile_pic");
  },
  methods: {
    search() {
      this.$router.push({
        path: "/search",
        query: { search_keyword: this.SearchKeyword },
      });
    },
    logout() {
      sessionStorage.setItem("user_session_token", "");
      sessionStorage.setItem("seller_session_token", "");
      sessionStorage.setItem("user_email", "");
      sessionStorage.setItem("first_name", "");
      sessionStorage.setItem("last_name", "");
      this.$router.push({
        path: "/",
        query: {},
      });
      // due to someone unknown reason i need to reload the site
      location.reload();
    },
  },
};
</script>

<style>
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
