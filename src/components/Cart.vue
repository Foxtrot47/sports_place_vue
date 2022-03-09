<template>
  <div class="bg-gray-100 h-full">
    <navbar />
    <div class="grid grid-cols-8 ml-10 mr-10 gap-x-4 mt-5 overflow-y-scroll">
      <div class="flex flex-col w-full col-span-6 h-full">
        <div class="bg-white shadow-sm mb-5 rounded h-full">
          <div class="flex flex-col pt-5 gap-2 h-full">
            <p class="pl-6 text-2xl font-product-sans">
              My Cart <span v-if="totalPrice < 1">(0)</span>
            </p>
            <hr class="bg-black" />
            <div v-if="totalPrice < 1">
              <p class="pl-5 my-5 text-lg">Your cart is empty!</p>
            </div>
            <div class="flex flex-col" v-else>
              <!-- Individual Cart Items -->
              <div v-for="(cartItem, index) in cartItems" :key="cartItem.id">
                <div
                  class="mx-6 flex flex-col gap-y-2"
                  v-if="cartItem.save_for_later == '0'"
                >
                  <div class="flex flex-row gap-x-10 pt-2">
                    <img :src="cartItem.product_main_image" class="w-32" />
                    <div>
                      <p class="text-xl font-medium overflow-hidden">
                        {{ cartItem.product_full_name }}
                      </p>
                      <p class="font-light mt-4">
                        Seller: {{ cartItem.product_seller_name }}
                      </p>
                      <p class="text-2xl font-bold mt-5">
                        ₹ {{ cartItem.price }}
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-row">
                    <div>
                      <button
                        type="button"
                        class="border border-gray-300 bg-white rounded-full h-8 w-8"
                        @click="
                          updateCartItem(
                            index,
                            cartItem.product_id,
                            'decrement'
                          )
                        "
                      >
                        -
                      </button>
                      <input
                        type="text"
                        class="mx-3 px-2border w-10 text-center"
                        v-model="cartItem.quantity"
                        @change="
                          updateCartItem(
                            index,
                            cartItem.product_id,
                            'quantity',
                            cartItem.quantity
                          )
                        "
                      />
                      <button
                        type="button"
                        class="border border-gray-300 bg-white rounded-full h-8 w-8"
                        @click="
                          updateCartItem(
                            index,
                            cartItem.product_id,
                            'increment'
                          )
                        "
                      >
                        +
                      </button>
                    </div>
                    <div class="flex flex-row gap-x-2 ml-10">
                      <button
                        type="button"
                        class="font-medium text-lg"
                        @click="
                          updateCartItem(
                            index,
                            cartItem.product_id,
                            'save_later',
                            1
                          )
                        "
                      >
                        SAVE FOR LATER
                      </button>
                      <button
                        type="button"
                        class="font-medium text-lg"
                        @click="
                          updateCartItem(
                            index,
                            cartItem.product_id,
                            'quantity',
                            0
                          )
                        "
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                  <hr class="bg-black-400 mt-2" />
                </div>
              </div>
              <!-- End of Individual Cart Items -->

              <div
                class="w-full flex justify-end py-3 shadow-sm rounded-lg"
                v-if="totalPrice > 0"
              >
                <span
                  class="px-6 py-3 mr-3 text-white align-middle filter shadow-sm bg-blue-500 rounded-full"
                  @click="this.$router.push('/users/checkout')"
                >
                  PLACE ORDER
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white shadow-sm mb-5 rounded" id="saved_sec">
          <div class="flex flex-col pt-5">
            <p class="pl-6 pb-4 font-product-sans text-2xl">Saved for later</p>
            <hr class="bg-gray-100" />
            <div class="flex flex-col pt-2">
              <!-- Show only when item count is zero ( set later in JS) -->
              <p class="pl-5 my-5 text-lg hidden" id="empty_cart_text">
                Your cart is empty!
              </p>
              <!-- Individual Saved for later items-->
              <div v-for="(cartItem, index) in cartItems" :key="cartItem.id">
                <div
                  class="mx-6 flex flex-col gap-y-2"
                  v-if="cartItem.save_for_later == '1'"
                >
                  <div class="flex flex-row gap-x-10">
                    <img :src="cartItem.product_main_image" class="w-32" />
                    <div>
                      <p class="text-xl font-medium overflow-hidden">
                        {{ cartItem.product_full_name }}
                      </p>
                      <p class="font-light mt-4">
                        Seller: {{ cartItem.product_seller_name }}
                      </p>
                      <p class="text-2xl font-bold mt-5">
                        ₹ {{ cartItem.total_price }}
                      </p>
                    </div>
                  </div>
                  <div class="flex flex-row">
                    <div>
                      <button
                        type="button"
                        class="border border-gray-300 bg-white rounded-full h-8 w-8"
                        @click="
                          updateCartItem(
                            index,
                            cartItem.product_id,
                            'decrement'
                          )
                        "
                      >
                        -
                      </button>
                      <input
                        type="text"
                        class="mx-3 px-2border w-10 text-center"
                        v-model="cartItem.quantity"
                        @change="
                          updateCartItem(
                            index,
                            cartItem.product_id,
                            'quantity',
                            cartItem.quantity
                          )
                        "
                      />
                      <button
                        type="button"
                        class="border border-gray-300 bg-white rounded-full h-8 w-8"
                        @click="
                          updateCartItem(
                            index,
                            cartItem.product_id,
                            'increment'
                          )
                        "
                      >
                        +
                      </button>
                    </div>
                    <div class="flex flex-row gap-x-2 ml-10">
                      <button
                        type="button"
                        class="font-medium text-lg"
                        @click="
                          updateCartItem(
                            index,
                            cartItem.product_id,
                            'save_later',
                            0
                          )
                        "
                      >
                        ADD TO CART
                      </button>
                      <button
                        type="button"
                        class="font-medium text-lg"
                        @change="
                          updateCartItem(
                            index,
                            cartItem.product_id,
                            'quantity',
                            0
                          )
                        "
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                  <hr class="bg-black-400 mt-2" />
                </div>
              </div>
              <!-- Individual Saved for later items end-->
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <div class="flex flex-col bg-white pt-4 shadow-sm rounded">
          <p class="text-md font-semibold text-gray-500 mb-4 pl-4">
            PRICE DETAILS
          </p>
          <hr class="bg-gray-100" />
          <div class="p-4 flex flex-col gap-4">
            <div class="flex flex-row w-full justify-between">
              <p>Price</p>
              <p>₹ {{ totalPrice }}</p>
            </div>
            <div class="flex flex-row w-full justify-between">
              <p>Discount</p>
              <p style="color: #388e3c">N/A</p>
            </div>
            <div class="flex flex-row w-full justify-between">
              <p>Delivery Charges</p>
              <p style="color: #388e3c">FREE</p>
            </div>
          </div>
          <hr class="bg-gray-100 mx-4" />
          <div class="p-4 flex flex-row justify-between font-semibold text-lg">
            <p>TOTAL AMOUNT</p>
            <p>₹ {{ totalPrice }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  name: "Cart",
  data() {
    return {
      cartItems: [],
      totalPrice: 0,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    fetchOrders() {
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "session_token",
        sessionStorage.getItem("user_session_token")
      );
      bodyFormData.append("mode", "list");
      // Send a request to our API and receive json data containing all listings made by the seller
      this.$axios({
        url: "http://localhost:80/sports_place/api/listcart.php",
        method: "post",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        component.cartItems = response.data.orders;
        component.totalPrice = response.data.total_price;
        component.cartItems.forEach((cartItem, index) => {
          component.fetchFullInfo(cartItem.product_id, index);
        });
      });
    },
    updateCartItem(id, productid, change, value) {
      if (change == "save_later") this.cartItems[id].save_for_later = value;
      else if (change == "quantity") this.cartItems[id].quantity = value;
      else if (change == "decrement") this.cartItems[id].quantity--;
      else if (change == "increment") this.cartItems[id].quantity++;
      this.sendReq(id, productid);
    },
    async sendReq(id, productId) {
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "session_token",
        sessionStorage.getItem("user_session_token")
      );
      bodyFormData.append("mode", "update");
      bodyFormData.append("productid", productId);
      bodyFormData.append("quantity", this.cartItems[id].quantity);
      bodyFormData.append("save_for_later", this.cartItems[id].save_for_later);
      // Send a request to our API and receive json data containing all listings made by the seller
      this.$axios({
        url: "http://localhost:80/sports_place/api/listcart.php",
        method: "post",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          component.cartItems = null;
          component.cartItems = response.data.orders;
          component.totalPrice = response.data.total_price;
          component.cartItems.forEach((cartItem, index) => {
            component.fetchFullInfo(cartItem.product_id, index);
          });
        })
        .catch(function (error) {
          if (error.response.statusText == "No orders") {
            component.cartItems = null;
            component.totalPrice = 0;
          }
        });
    },
    // Fetch product info of individual products
    async fetchFullInfo(productID, index) {
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "session_token",
        sessionStorage.getItem("user_session_token")
      );
      bodyFormData.append("productid", productID);
      bodyFormData.append("minimal", "1");
      await this.$axios({
        url: "http://localhost:80/sports_place/api/productinfo.php",
        method: "post",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        component.cartItems[index].product_full_name =
          response.data.product_full_name;
        component.cartItems[index].product_price = response.data.product_price;
        component.cartItems[index].product_main_image =
          response.data.product_main_image;
        component.cartItems[index].product_seller_name =
          response.data.product_seller_name;
      });
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style></style>
