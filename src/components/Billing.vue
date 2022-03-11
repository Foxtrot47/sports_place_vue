<template>
  <div
    class="bg-gray-100 h-full overflow-y-scroll dark:bg-gray-800 dark:text-white"
  >
    <navbar />
    <div class="flex flex-row mx-20 my-4 justify-center gap-x-6 mb-5 static">
      <div class="flex flex-col flex-none w-4/6 gap-y-4 relative">
        <!-- Start of address section-->
        <div class="flex flex-col">
          <div class="px-4 py-3 flex flex-row gap-x-4 accordion items-center">
            <span class="text-blue-500 heading-no px-2">1</span>
            <span class="font-product-sans">Delivery Address</span>
            <i class="far fa-check" v-if="selectedAddr > 0"></i>
          </div>
          <div class="panel flex flex-col gap-y-4">
            <div class="bg-white">
              <div class="flex flex-col py-4 gap-y-4">
                <div
                  v-for="address in addressList"
                  :key="address.id"
                  @click="selectedAddr = address.id"
                >
                  <div class="flex flex-row gap-x-2 pl-6">
                    <input
                      type="radio"
                      class="mt-1"
                      v-model="selectedAddr"
                      :value="address.id"
                    />
                    <div class="flex flex-col items-center pl-3">
                      <div class="flex flex-row items-center gap-x-2">
                        <span class="font-medium"
                          >{{ address.addr_first_name }}
                          {{ address.addr_last_name }}</span
                        >
                        <span
                          class="bg-gray-200 text-gray-600 text-xs px-1 py-1 rounded"
                          >{{ address.addr_type }}</span
                        >
                        <span class=""
                          >+{{ address.addr_country_code
                          }}{{ address.addr_mobile_num }}</span
                        >
                      </div>
                    </div>
                  </div>
                  <span class="px-6 font-light text-gray-500 pl-14">
                    {{ address.addr_street_addr }},
                    {{ address.addr_additional }},
                    {{ address.addr_street_addr }}, {{ address.addr_city }},
                    {{ address.addr_state }}, {{ address.addr_country }},
                  </span>
                  <button
                    type="button"
                    class="bg-blue-500 text-white px-20 py-3 ml-14 my-4 rounded-full"
                    v-if="selectedAddr == address.id"
                    @click="openAccord(1)"
                  >
                    Deliver Here
                  </button>
                </div>
              </div>
            </div>
            <div class="flex flex-row items-center bg-white py-2 rounded-lg">
              <i class="far fa-plus text-blue-500 pl-6 pr-5 py-2"></i>
              <span class="text-blue-500">Add a new address</span>
            </div>
          </div>
        </div>
        <!-- End of address section-->
        <!-- Start of summary section-->

        <div class="flex flex-col">
          <div class="px-4 py-3 flex flex-row gap-x-4 accordion items-center">
            <span class="text-blue-500 px-2 heading-no">2</span>
            <span class="font-product-sans">Order Summary</span>
            <i
              class="far fa-check status-mark"
              v-if="cartItems && summaryConfirmed"
            ></i>
          </div>
          <div class="panel bg-white flex flex-col">
            <div v-for="(cartItem, index) in cartItems" :key="cartItem.id">
              <div
                class="flex flex-col pt-4"
                v-if="cartItem.save_for_later == '0'"
              >
                <div class="flex flex-row gap-x-10 pl-10 pr-20">
                  <img :src="cartItem.product_main_image" class="w-24" />
                  <div class="flex-none">
                    <p class="text-lg font-medium overflow-hidden">
                      {{ cartItem.product_full_name }}
                    </p>
                    <p class="font-light mt-2 text-sm">Seller:</p>
                    <p class="text-xl font-bold mt-5">₹ {{ cartItem.price }}</p>
                  </div>
                  <div
                    class="flex flex-row justify-end w-full font-light text-gray-500"
                  >
                    Delivery in 1 day |&nbsp;<span class="text-green-500"
                      >Free</span
                    >
                  </div>
                </div>
                <div class="flex flex-row pl-6 gap-x-6">
                  <div>
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
                      class="mx-3 px-2border w-10 text-center border-2"
                      @change="
                        updateCartItem(
                          index,
                          cartItem.product_id,
                          'quantity',
                          cartItem.quantity
                        )
                      "
                      v-model="cartItem.quantity"
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
                  <button type="button" class="font-medium hover:text-blue-500">
                    REMOVE
                  </button>
                </div>
                <hr class="bg-black-400 mt-2" />
              </div>
            </div>
            <div class="my-2 flex items-center">
              <button
                type="button"
                class="bg-blue-500 text-white px-20 py-3 ml-14 rounded-full w-72"
                v-if="cartItems"
                @click="openAccord(2) & (summaryConfirmed = true)"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        <!--End of summary section-->
        <!-- Start of payment method section-->
        <div class="flex flex-col">
          <div
            class="px-4 py-3 flex flex-row gap-x-4 items-center accordion h-12"
          >
            <span class="px-2 text-blue-500 heading-no">3</span>
            <span class="font-product-sans">Payment Options</span>
            <i class="far fa-check" v-if="selectedPayment != ''"></i>
          </div>
          <div class="bg-white rounded-lg panel flex flex-col gap-y-2">
            <div class="flex flex-col py-4 gap-y-4 text-gray-600">
              <div
                class="flex flex-row gap-x-2 pl-6"
                @click="setPaymentMethod('UPI')"
              >
                <input
                  type="radio"
                  class="mt-1"
                  v-model="selectedPayment"
                  :value="'UPI'"
                />
                <span class="px-3">UPI</span>
              </div>
              <hr class="w-full" />
              <div
                class="flex flex-row gap-x-2 pl-6"
                @click="setPaymentMethod('CC')"
              >
                <input
                  type="radio"
                  class="mt-1"
                  v-model="selectedPayment"
                  :value="'CC'"
                />
                <span class="px-3">Credit , Debit & ATM Cards</span>
              </div>
              <hr class="w-full" />
              <div
                class="flex flex-row gap-x-2 pl-6"
                @click="setPaymentMethod('Net')"
              >
                <input
                  type="radio"
                  class="mt-1"
                  v-model="selectedPayment"
                  :value="'Net'"
                />
                <span class="px-3">Net Banking</span>
              </div>
              <hr class="w-full" />
              <div
                class="flex flex-row gap-x-2 pl-6"
                @click="setPaymentMethod('COD')"
              >
                <input
                  type="radio"
                  class="mt-1"
                  v-model="selectedPayment"
                  :value="'COD'"
                />
                <span class="px-3">Cash on delivery</span>
              </div>
            </div>
            <div class="flex items-center mb-4">
              <button
                type="button"
                class="bg-blue-500 text-white px-20 py-3 ml-14 rounded-full w-72"
                v-if="selectedPayment != ''"
                @click="commitOrder()"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
        <!-- End of payment method section-->
      </div>
      <div class="flex-none relative">
        <div class="bg-white dark:bg-gray-900 rounded-lg sticky top-20">
          <div class="flex flex-col pt-4 shadow-sm rounded">
            <p
              class="text-md font-semibold text-gray-500 dark:text-gray-200 mb-4 pl-4"
            >
              PRICE DETAILS
            </p>
            <hr class="dark:border-gray-600" />
            <div class="p-4 flex flex-col gap-4">
              <div class="flex flex-row w-full justify-between">
                <p>Price</p>
                <p>₹ {{ cartItems.total_price }}.00</p>
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
            <hr class="dark:border-gray-600" />
            <div
              class="p-4 flex flex-row justify-between font-semibold text-lg gap-x-32"
            >
              <p>TOTAL AMOUNT</p>
              <p>₹{{ cartItems.total_price }}.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  name: "User-Billing",
  data() {
    return {
      cartItems: [],
      email: "",
      addressList: [],
      selectedAddr: 0,
      selectedPayment: "",
      summaryConfirmed: false,
    };
  },
  components: {
    Navbar,
  },
  methods: {
    async fetchCartItems() {
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "session_token",
        sessionStorage.getItem("user_session_token")
      );
      bodyFormData.append("mode", "list");
      // Fetch all the cartitems
      const config = {
        url: "/listcart.php",
        method: "post",
        data: bodyFormData,
      };
      await this.$req.request(config).then(function (response) {
        component.cartItems = response.data.orders;
        component.cartItems.forEach((cartItem, index) => {
          component.fetchFullInfo(cartItem.product_id, index);
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
        component.cartItems[index].product_full_name =
          response.data.product_full_name;
        component.cartItems[index].product_price = response.data.product_price;
        component.cartItems[index].product_main_image =
          response.data.product_main_image;
        component.cartItems[index].product_seller_name =
          response.data.product_seller_name;
      });
    },
    // Function to update the quantity depending on which button user clicks
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
      // Send request to update quantity and status of a product
      // Fetch all the cartitems
      const config = {
        url: "/listcart.php",
        method: "post",
        data: bodyFormData,
      };
      await this.$req.request(config).then(function (response) {
        component.cartItems = response.data;
        component.cartItems.total_price = response.data.total_price;
      });
    },
    setupAccordion() {
      var acc = document.getElementsByClassName("accordion");
      var i;
      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          // fire click even on already active elements thereby compacting them
          var active = document.getElementsByClassName("active");
          var j;
          for (j = 0; j < active.length; j++) {
            active[j].click();
          }
          /* Toggle between adding and removing the "active" class,
          to highlight the button that controls the panel */
          this.classList.toggle("active");

          /* Toggle between hiding and showing the active panel */
          var panel = this.nextElementSibling;
          if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
        });
      }
    },
    openAccord(id) {
      document.getElementsByClassName("accordion")[id].click();
    },
    setPaymentMethod(method) {
      this.selectedPayment = method;
      // Reset the accordion panel height
      setTimeout(function () {
        const parentElement = document.getElementsByClassName("accordion")[2];
        const panel = parentElement.nextElementSibling;
        panel.style.maxHeight = panel.scrollHeight + "px";
      }, 20);
    },
    async fetchAddress() {
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "session_token",
        sessionStorage.getItem("user_session_token")
      );
      bodyFormData.append("mode", "list");
      // Send request to fetch all saved address of the user
      const config = {
        url: "/listaddress.php",
        method: "post",
        data: bodyFormData,
      };
      await this.$req.request(config).then(function (response) {
        component.addressList = response.data;
      });
    },
    async commitOrder() {
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "session_token",
        sessionStorage.getItem("user_session_token")
      );
      bodyFormData.append("pmethod", this.selectedPayment);
      bodyFormData.append("addressid", this.selectedAddr);
      // Send a request to our  to confirm the order
      // Do note we are not actually implementing any transactions here
      // It is out of scope of this project
      const config = {
        url: "/commitorder.php",
        method: "post",
        data: bodyFormData,
      };
      await this.$req.request(config).then(function () {
        component.$router.push({
          path: "/users/orders",
        });
      });
    },
  },
  mounted() {
    this.fetchCartItems();
    this.setupAccordion();
    this.email = sessionStorage.getItem("user_email");
    this.fetchAddress();
  },
};
</script>

<style scoped>
.accordion {
  transition: 0.4s;
  background-color: white;
  color: black;
  border-radius: 0.5rem;
}
.panel {
  transition: max-height 0.2s ease-out;
  overflow: hidden;
  max-height: 0;
}
.active {
  background-color: rgb(59 130 246);
  color: white;
  border-radius: 0.5rem 0.5rem 0 0;
}
.heading-no {
  background-color: #f0f0f0;
}
.active > .heading-no {
  background-color: white;
}
</style>
