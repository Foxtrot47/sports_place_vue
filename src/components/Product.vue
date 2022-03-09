<template>
  <div class="bg-gray-100 h-full">
    <navbar />
    <div class="flex flex-col gap-y-4 mx-20 my-4 h-max">
      <div class="grid grid-cols-11 gap-x-2 justify-center p-4 bg-white">
        <div class="col-span-5 flex flex-col gap-y-2">
          <div class="flex flex-row gap-x-2 justify-end h-92">
            <div class="w-20 flex flex-none flex-col gap-1 relative">
              <div
                class="bg-gray-500 absolute left-1/3 top-0 z-10 rounded-full px-1 text-white shadow up-scroll-button"
              >
                <i class="fa-solid fa-arrow-up"></i>
              </div>
              <div
                class="bg-gray-500 absolute bottom-0 right-1/3 z-10 rounded-full px-1 text-white shadow down-scroll-button"
              >
                <i class="fa-solid fa-arrow-down"></i>
              </div>
              <div
                class="flex flex-col gap-y-2 overflow-hidden transition ease-in-out delay-150"
              >
                <div
                  v-for="(image, index) in productInfo.product_images"
                  :key="image"
                  @click="selectedImageId = index"
                  class="hover:border-blue-500 hover:border-2"
                >
                  <img :src="image" class="hover:border-blue-500 border-2" />
                </div>
              </div>
            </div>
            <div
              class="flex justify-center px-12 p-4"
              v-if="productInfo.product_images != undefined"
            >
              <img :src="productInfo.product_images[selectedImageId]" />
            </div>
          </div>

          <div class="flex flex-row flex-none justify-end gap-x-1">
            <div class="w-20 invisible">Hidden</div>
            <div class="flex flex-row gap-x-2">
              <button
                class="text-xl text-white"
                style="background-color: #ff9f00; padding: 18px 60px 18px 60px"
                @click="addToCart('cart')"
              >
                <i class="fa-solid fa-cart-shopping"></i>
                Add to Cart
              </button>
              <button
                class="text-xl text-white"
                style="background-color: #fb641b; padding: 18px 70px 18px 69px"
                @click="addToCart('checkout')"
              >
                <i class="fas fa-bolt-lightning"></i>
                Buy Now
              </button>
            </div>
          </div>
        </div>
        <div class="col-span-6 flex flex-col gap-y-4 pl-2">
          <div class="flex flex-row gap-x-2 text-gray-500">
            <p>Home</p>
            &gt;
            <p>{{ catName }}</p>
            &gt;
            <p>{{ subCatName }}</p>
            &gt;
            <p class="truncate w-56">{{ productInfo.product_full_name }}</p>
          </div>
          <div class="font-product-sans text-xl">
            {{ productInfo.product_full_name }}
          </div>
          <div class="text-3xl font-semibold">
            ₹ {{ productInfo.product_price }}
          </div>
        </div>
      </div>
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
      catName: "",
      subCatName: "",
      selectedImageId: 0,
    };
  },
  components: { Navbar },
  props: ["productid"],
  mounted() {
    this.fetchProductInfo();

    // Setting up up and right scroll buttons
    const upScrollButton = document.getElementsByClassName("up-scroll-button");
    const downScrollButton =
      document.getElementsByClassName("down-scroll-button");
    var i;
    for (i = 0; i < upScrollButton.length; i++) {
      upScrollButton[i].addEventListener("click", function () {
        console.log(this.parentElement);
        this.parentElement.lastChild.scrollTop -= 100;
      });
    }
    for (i = 0; i < downScrollButton.length; i++) {
      downScrollButton[i].addEventListener("click", function () {
        this.parentElement.lastChild.scrollTop += 100;
      });
    }
  },
  methods: {
    fetchProductInfo() {
      const component = this;
      // Send a request to our API and receive json data containing all listings made by the seller
      axios({
        url: "http://localhost:80/sports_place/api/productinfo.php",
        method: "get",
        params: {
          productid: component.product_ID,
        },
      }).then(function (response) {
        component.productInfo = response.data;
        component.catName =
          component.$cat_list.categories[
            response.data.product_main_category
          ].catname;
        component.subCatName =
          component.$cat_list.subcategories[
            response.data.product_sub_category
          ].subcatname;
      });
    },
    addToCart(path) {
      if (!sessionStorage.getItem("user_session_token")) {
        this.$router.push({
          path: "/users/login",
        });
        return;
      }
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "session_token",
        sessionStorage.getItem("user_session_token")
      );
      bodyFormData.append("mode", "add");
      bodyFormData.append("productid", this.product_ID);
      bodyFormData.append("quantity", 1);
      // Send a request to our API to add the product to cart
      this.$axios({
        url: "http://localhost:80/sports_place/api/listcart.php",
        method: "post",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function () {
        component.$router.push({
          path: `/users/${path}`,
        });
      });
    },
  },
};
</script>

<style></style>
