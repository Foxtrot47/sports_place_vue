<template>
  <div class="bg-gray-100 flex flex-col">
    <navbar />
    <div class="flex flex-row m-4 mx-16 gap-x-4">
      <div
        class="flex flex-col w-60 bg-white filter drop-shadow-sm p-4 rounded-lg h-max"
      >
        <p class="font-semibold text-2xl font-product-sans">Filters</p>
        <p class="font-semibold text-xl pt-1 pb-1 font-roboto">ORDER TIME</p>
        <div class="flex flex-row gap-x-2 items-center mt-2">
          <input
            class="inline"
            type="checkbox"
            name="order_time_filter"
            value="last_30"
          />
          <span>Last 30 Days</span>
        </div>
        <div class="flex flex-row gap-x-2 items-center mt-2">
          <input
            class="inline"
            type="checkbox"
            name="order_time_filter"
            value="2020"
          />
          <span>2020</span>
        </div>
        <div class="flex flex-row gap-x-2 items-center mt-2">
          <input
            class="inline"
            type="checkbox"
            name="order_time_filter"
            value="2019"
          />
          <span>2019</span>
        </div>
      </div>
      <div class="flex flex-col w-full mr-10">
        <div class="filter drop-shadow-sm flex flex-col gap-y-2 w-full">
          <div v-for="order in orderList" :key="order.order_id">
            <router-link :to="`/product/${order.product_id}`">
              <div
                class="w-full bg-white grid grid-cols-7 px-10 py-4 rounded-lg hover:bg-gray-200"
              >
                <div>
                  <img :src="order.product_main_image" class="w-24" />
                </div>
                <div class="flex flex-col gap-y-2 col-span-4">
                  <p class="text-2xl font-semibold truncate">
                    {{ order.product_full_name }}
                  </p>
                </div>

                <div class="flex flex-row justify-around w-full col-span-2">
                  <p>₹{{ order.order_price }}</p>
                  <div class="flex flex-col gap-y-2">
                    <p class="font-semibold">
                      Order Date: {{ order.order_date }}
                    </p>
                    <p class="text-sm">Your item has been Delivered</p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
export default {
  name: "UserOrders",
  components: { Navbar },
  data() {
    return {
      orderList: [],
    };
  },
  methods: {
    async fetchOrders() {
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "session_token",
        sessionStorage.getItem("user_session_token")
      );
      // Fetch all orders made by user
      const config = {
        url: "/listorders.php",
        method: "post",
        data: bodyFormData,
      };
      await this.$req.request(config).then(function (response) {
        component.orderList = response.data;
        component.orderList.forEach((orderItem, index) => {
          component.fetchFullInfo(orderItem.product_id, index);
        });
      });
    },
    // Fetch product info of individual products
    async fetchFullInfo(productID, index) {
      const component = this;
      const config = {
        url: "/productinfo.php",
        method: "get",
        params: {
          productid: productID,
          minimal: 1,
        },
      };
      await this.$req.request(config).then(function (response) {
        component.orderList[index].product_full_name =
          response.data.product_full_name;
        component.orderList[index].product_price = response.data.product_price;
        component.orderList[index].product_main_image =
          response.data.product_main_image;
        component.orderList[index].product_seller_name =
          response.data.product_seller_name;
      });
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style>
.input:focus {
  outline: none;
}
</style>
