<template>
  <div class="bg-gray-200 h-full flex flex-col">
    <nav
      class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 flex flex-row justify-between"
    >
      <div
        class="container flex flex-wrap justify-between items-center mx-auto"
      >
        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <svg
            class="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
          <ul
            class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-product-sans"
          >
            <li>
              <a
                href="#"
                class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
                >Home</a
              >
            </li>
            <li>
              <router-link
                to="/sellers/mylistings"
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Listings</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="flex flex-row gap-x-2 mx-6">
        <img :src="this.seller_profile_pic" class="h-10 w-10 rounded-full" />
        <router-link to="/sellers/profile">
          <div class="flex flex-col">
            <div class="">
              {{ seller_first_name + seller_last_name }}
            </div>
            <div class="text-sm">
              {{ seller_email_address }}
            </div>
          </div>
        </router-link>
      </div>
    </nav>
    <div class="flex flex-row mx-2 my-4 bg-white h-full">
      <div class="flex flex-col px-5 py-2 mt-40">
        <h1 class="text-xl font-product-sans">
          Hello
          <span>{{ seller_first_name }}</span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import MD5 from "crypto-js/md5";

export default {
  name: "SellerHome",
  data() {
    return {
      seller_email_address: "",
      seller_first_name: "",
      seller_last_name: "",
      seller_profile_pic: "",
    };
  },
  mounted() {
    this.seller_email_address = sessionStorage.getItem("seller_email");
    this.seller_first_name = sessionStorage.getItem("seller_first_name");
    this.seller_last_name = sessionStorage.getItem("seller_last_name");

    this.seller_profile_pic =
      "https://www.gravatar.com/avatar/" +
      MD5(this.seller_email_address) +
      "&s=10";
  },
};
</script>
