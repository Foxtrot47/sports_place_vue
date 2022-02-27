<template>
  <div class="bg-gray-100">
    <navbar />
    <div class="grid grid-cols-8 ml-10 mr-10 gap-x-4 mt-5">
      <div class="flex flex-col w-full col-span-6">
        <div class="bg-white shadow-md mb-5">
          <div class="flex flex-col pt-5">
            <p class="pl-6 pb-4 font-semibold text-xl">My Cart</p>
            <hr class="bg-black" />
            <div class="flex flex-col gap-2">
              <!-- Show only when item count is zero ( set later in JS) -->
              <p class="pl-5 my-5 text-lg hidden" id="empty_cart_text">
                Your cart is empty!
              </p>

              <!-- Individual Cart Items -->
              <div v-for="(cartItem, index) in cartItems" :key="cartItem.id">
                <div
                  class="pl-6 flex flex-row gap-x-2"
                  v-if="cartItem.save_for_later == '0'"
                >
                  <div class="flex flex-col w-44">
                    <img :src="cartItem.product_main_image" />
                    <div class="flex flex-row ml-2 mt-4">
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
                        class="mx-3 px-2 border w-16 text-center"
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
                  </div>
                  <div class="flex flex-col">
                    <p class="text-xl font-medium overflow-hidden">
                      {{ cartItem.product_full_name }}
                    </p>
                    <p class="font-light">Seller:</p>
                    <p class="text-2xl font-bold mt-5 ml-5">
                      $ {{ cartItem.total_price }}
                    </p>
                    <div class="flex flex-row mt-12 gap-x-4">
                      <button
                        type="button"
                        class="font-semibold"
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
                        class="font-semibold"
                        @change="
                          updateCartItem(
                            index,
                            cartItem.product_id,
                            'quantity',
                            cartItem.quantity
                          )
                        "
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End of Individual Cart Items -->

              <div
                class="w-full flex justify-end py-3"
                style="box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%)"
              >
                <span
                  style="background-color: #fb641b"
                  class="px-6 py-3 mr-3 text-white align-middle filter drop-shadow-lg"
                >
                  PLACE ORDER
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white shadow-md mb-5" id="saved_sec">
          <div class="flex flex-col pt-5">
            <p class="pl-6 pb-4 font-semibold text-xl">Saved for later</p>
            <hr class="bg-gray-100" />
            <div
              class="pl-6 py-4 flex flex-col gap-2"
              v-for="(cartItem, index) in cartItems"
              :key="cartItem.id"
            >
              <div
                class="flex flex-row gap-x-2"
                v-if="cartItem.save_for_later == '1'"
              >
                <div class="flex flex-col w-44">
                  <img :src="cartItem.product_main_image" />
                  <div class="flex flex-row ml-2 mt-4">
                    <button
                      type="button"
                      class="border border-gray-300 bg-white rounded-full h-8 w-8"
                      @click="
                        updateCartItem(index, cartItem.product_id, 'decrement')
                      "
                    >
                      -
                    </button>
                    <input
                      type="text"
                      class="mx-3 px-2 border w-16 text-center"
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
                        updateCartItem(index, cartItem.product_id, 'increment')
                      "
                    >
                      +
                    </button>
                  </div>
                </div>
                <div class="flex flex-col">
                  <p class="text-xl font-medium overflow-hidden">
                    {{ cartItem.product_full_name }}
                  </p>
                  <p class="font-light">Seller:</p>
                  <p class="text-2xl font-bold mt-5">
                    $ {{ cartItem.total_price }}
                  </p>
                  <div class="flex flex-row mt-12 gap-x-4">
                    <button
                      type="button"
                      class="font-semibold"
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
                      class="font-semibold"
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <div class="flex flex-col bg-white py-4 shadow-md">
          <p class="text-md font-semibold text-gray-500 mb-4 pl-4">
            PRICE DETAILS
          </p>
          <hr class="bg-gray-100" />
          <div class="p-4 flex flex-col gap-4">
            <div class="flex flex-row w-full justify-between">
              <p>Price</p>
              <p>$ {{ cartItems.total_price }}</p>
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
            <p>$ {{ cartItems.total_price }}</p>
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
        url: "http://localhost:80/sports_place/helpers/listcart.php",
        method: "post",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        component.cartItems = response.data;
      });
    },
    updateCartItem(id, productid, change, value) {
      console.log("Bruh");
      if (change == "save_later") this.cartItems[id].save_for_later = value;
      else if (change == "quantity") this.cartItems[id].quantity = value;
      else if (change == "decrement") this.cartItems[id].quantity--;
      else if (change == "increment") this.cartItems[id].quantity++;
      this.sendReq(id, productid);
    },
    sendReq(id, productId) {
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
        url: "http://localhost:80/sports_place/helpers/listcart.php",
        method: "post",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        console.log(response);
        component.cartItems = response.data;
        component.cartItems.total_price = response.data.total_price;
      });
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style></style>
