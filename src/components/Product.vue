<template>
  <div class="bg-gray-100">
    <navbar />
    <div class="bg-white p-4 pb-1 mt-2 a">
      <div class="flex flex-row w-full h-5/6">
        <div class="w-1/2 flex-none">
          <div class="">
            <div class="flex flex-row h-full">
              <div
                class="w-24 mr-4 flex flex-none flex-col gap-1 overflow-hidden"
              >
                <!--- Split the product_images value into individual string seperated by spaces
                                  and make new div elements and images inside them using the splitted string as src
                            -->
                <div
                  v-for="image in productInfo.product_images"
                  :key="image.image"
                >
                  <img :src="image" />
                </div>
              </div>
              <div class="w-full flex justify-center px-12 p-4">
                <img :src="productInfo.product_main_image" />
              </div>
            </div>
          </div>
        </div>
        <div class="pl-8 p-2 w-full flex flex-col">
          <p class="text-gray-500 text-sm">
            Home >
            <span> {{ productInfo.product_main_category }}></span>
            >
            <span>{{ productInfo.product_sub_category }} </span>
            >
            <span id="product_name_small">{{
              productInfo.product_full_name
            }}</span>
          </p>
          <p class="text-black text-xl py-2">
            {{ productInfo.product_full_name }}
          </p>
          <div class="grid grid-cols-12 w-full">
            <p class="text-2xl font-bold">$</p>
            <p class="text-2xl font-bold col-span-10">
              {{ productInfo.product_price }}
            </p>
            <p class="text-xl text-right"></p>
          </div>
          <hr class="border border-gray-100 w-full my-2" />
          <p class="text-red-500 text-xl py-2 hidden" id="oot_indic">
            Out of stock.
          </p>
          <div class="grid grid-cols-10 gap-2">
            <div class="h-12 border border-gray-300 py-2">
              <p class="text-center" id="quantity">1</p>
            </div>
            <div class="h-12 bg-blue-500 py-3 col-span-9 text-center">
              <button class="text-white w-full h-full" onclick="dummy">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="bg-gray-300 border-t-2" />
    <div
      class="sticky bg-white h-14 w-full top-20-px pr-2 text-xl pt-1.5 drop-shadow-md filter z-30"
    >
      <button class="hover:text-blue-500 pt-2 px-3 align-middle">
        Features
      </button>
      <button class="hover:text-blue-500 pt-2 pr-3 align-middle">
        Reviews
      </button>
      <button class="hover:text-blue-500 pt-2 pr-3 align-middle">
        Product Information
      </button>
      <button
        class="pt-2 bg-blue-500 h-5/6 rounded py-1 px-2 text-white align-middle float-right"
        onclick="dummy"
      >
        ADD TO CART
      </button>
      <button class="pt-2 pr-3 align-middle float-right">
        <span>$</span>
        <span> {{ productInfo.product_price }} </span>
      </button>
    </div>

    <div class="bg-white pt-10">
      <img :src="productInfo.product_features" />
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import axios from "axios";
export default {
  data() {
    return {
      productInfo: [],
      product_ID: this.productid,
    };
  },
  components: { Navbar },
  props: ["productid"],
  mounted() {
    this.fetchProductInfo();
  },
  methods: {
    fetchProductInfo() {
      const component = this;
      console.log(this.productid);
      // Send a request to our API and receive json data containing all listings made by the seller
      axios({
        url: "http://localhost:80/sports_place/helpers/productinfo.php",
        method: "get",
        params: {
          productid: component.product_ID,
        },
      }).then(function (response) {
        component.productInfo = response.data;
      });
    },
  },
};
</script>

<style></style>
