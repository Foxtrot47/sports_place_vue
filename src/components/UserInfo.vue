<template>
  <div
    class="bg-gray-100 h-full overflow-y-scroll dark:bg-gray-800 dark:text-white static"
  >
    <navbar />
    <!-- Confirm Password dialogue box start -->
    <div
      v-if="showPasswordDialogue"
      class="absolute top-0 z-10 w-full h-screen flex items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-30"
    >
      <div
        class="bg-white flex flex-col px-6 py-4 shadow-lg rounded-lg gap-y-4 items-center"
      >
        <p class="text-2xl font-product-sans">
          Enter your Password to continue
        </p>
        <input
          type="text"
          class="px-4 py-2 border border-black"
          placeholder="Enter password"
          v-model="userPassword"
        />
        <span class="text-red-500">Invalid Password</span>
        <div class="flex flex-row gap-x-4">
          <button
            type="button"
            class="bg-blue-500 px-4 py-2 text-xl rounded-full w-32 text-white"
            @click="updateInfo()"
          >
            Submit
          </button>
          <button
            type="button"
            class="bg-gray-200 px-4 py-2 text-xl rounded-full w-32"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <!-- Confirm Password dialogue box end -->
    <div class="grid grid-cols-8 px-20 gap-4 mt-5">
      <div class="col-span-2">
        <div class="flex flex-col">
          <div class="flex flex-row bg-white p-3 items-center shadow-md mb-5">
            <img :src="avatarUrl" class="rounded-full w-12" />
            <p class="pl-3 font-semibold">Hello {{ userInfo.first_name }}</p>
          </div>
          <div class="flex flex-col bg-white py-4 shadow-md">
            <div class="flex flex-row pl-6 py-2">
              <svg
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

              <p class="font-semibold pl-4" style="color: #878787">MY ORDERS</p>
            </div>
            <div class="flex flex-row pl-16 py-2">
              <p class="text-black">Order History</p>
            </div>
            <hr class="bg-gray-300 w-full" />
            <div class="flex flex-row pl-6 py-2">
              <svg
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

              <p class="font-semibold pl-4" style="color: #878787">
                ACCOUNT SETTINGS
              </p>
            </div>
            <div
              class="flex flex-row pl-16 py-2"
              :class="{
                'bg-blue-50': activeTab === 'ProfileInfo',
                'text-blue-500': activeTab === 'ProfileInfo',
                'font-semibold': activeTab === 'ProfileInfo',
              }"
            >
              <p @click="activeTab = 'ProfileInfo'">Profile Information</p>
            </div>
            <div
              class="flex flex-row pl-16 py-2"
              :class="{
                'bg-blue-50': activeTab === 'ListAddr',
                'text-blue-500': activeTab === 'ListAddr',
                'font-semibold': activeTab === 'ListAddr',
              }"
            >
              <p @click="activeTab = 'ListAddr'">Edit Address</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="bg-white col-span-6 shadow-lg mb-5"
        id="personal_info"
        v-show="activeTab === 'ProfileInfo'"
      >
        <div class="pl-6 pt-5">
          <div class="flex flex-col">
            <div class="pb-4">
              <div class="flex flex-row items-center gap-x-6">
                <p class="font-semibold text-xl">Personal Information</p>
                <p
                  class="text-blue-500"
                  v-if="personalInfoEdit == false"
                  @click="personalInfoEdit = true"
                >
                  Edit
                </p>
                <p
                  class="text-blue-500"
                  v-if="personalInfoEdit == true"
                  @click="personalInfoEdit = false & this.fetchInfo()"
                >
                  Cancel
                </p>
              </div>
              <div class="py-4 flex flex-row gap-2">
                <input
                  type="text"
                  class="p-2 bg-gray-100 border-gray-300 rounded border antialiased"
                  :disabled="!personalInfoEdit"
                  v-model="userInfo.first_name"
                />
                <input
                  type="text"
                  class="p-2 bg-gray-100 border-gray-300 rounded border antialiased"
                  :disabled="!personalInfoEdit"
                  v-model="userInfo.last_name"
                />
                <button
                  type="button"
                  class="px-6 text-white rounded-full bg-blue-500"
                  v-if="personalInfoEdit == true"
                  @click="personalInfoEdit = false & updateInfo()"
                >
                  Save
                </button>
              </div>
              <p class="my-2">Your Gender</p>
              <input
                type="radio"
                id="male_radio"
                value="m"
                v-model="this.userInfo.user_gender"
                :disabled="!personalInfoEdit"
              />
              <label class="text-lg px-2" for="male_radio">Male</label>
              <input
                type="radio"
                id="female_radio"
                value="f"
                v-model="userInfo.user_gender"
                :disabled="!personalInfoEdit"
              />
              <label class="text-lg px-2" for="female_radio">Female</label>
              <input
                type="radio"
                id="nonb_radio"
                value="n"
                v-model="userInfo.user_gender"
                :disabled="!personalInfoEdit"
              />
              <label class="text-lg px-2" for="nonb_radio">Nonbinary</label>
            </div>
            <div class="pt-4">
              <div class="flex flex-row items-center gap-x-6">
                <p class="font-semibold text-xl">Email Address</p>
                <p
                  class="text-blue-500"
                  v-if="emailEdit == false"
                  @click="emailEdit = true"
                >
                  Edit
                </p>
                <p
                  class="text-blue-500"
                  v-if="emailEdit == true"
                  @click="emailEdit = false & this.fetchInfo()"
                >
                  Cancel
                </p>
              </div>
              <div class="py-4 flex flex-row gap-2">
                <input
                  type="text"
                  class="p-2 bg-gray-100 border-gray-300 rounded border antialiased"
                  :disabled="!emailEdit"
                  v-model="userInfo.user_email"
                />
                <button
                  type="button"
                  class="px-6 text-white rounded-full bg-blue-500"
                  v-if="emailEdit == true"
                  @click="emailEdit = false & updateInfo()"
                >
                  Save
                </button>
              </div>
            </div>
            <div class="pt-6">
              <div class="flex flex-row items-center gap-x-6">
                <p class="font-semibold text-xl">Mobile Number</p>
                <p
                  class="text-blue-500"
                  v-if="mobileEdit == false"
                  @click="mobileEdit = true"
                >
                  Edit
                </p>
                <p
                  class="text-blue-500"
                  v-if="mobileEdit == true"
                  @click="mobileEdit = false & this.fetchInfo()"
                >
                  Cancel
                </p>
              </div>
              <div class="py-4 flex flex-row gap-2">
                <input
                  type="number"
                  class="p-2 bg-gray-100 border-gray-300 rounded border antialiased"
                  :disabled="!mobileEdit"
                  v-model="userInfo.user_mobile_num"
                />
                <button
                  type="button"
                  class="px-6 text-white rounded-full bg-blue-500"
                  v-if="mobileEdit == true"
                  @click="mobileEdit = false & updateInfo()"
                >
                  Save
                </button>
              </div>
            </div>
            <div class="pt-6">
              <div class="flex flex-row items-center gap-x-6">
                <p class="font-semibold text-xl">Date of Birth</p>
                <p
                  class="text-blue-500"
                  v-if="dobEdit == false"
                  @click="dobEdit = true"
                >
                  Edit
                </p>
                <p
                  class="text-blue-500"
                  v-if="dobEdit == true"
                  @click="dobEdit = false & this.fetchInfo()"
                >
                  Cancel
                </p>
              </div>
              <div class="py-4 flex flex-row gap-2">
                <input
                  type="date"
                  class="p-2 bg-gray-100 border-gray-300 rounded border antialiased"
                  :disabled="!dobEdit"
                  v-model="userInfo.user_dob"
                />
                <button
                  type="button"
                  class="px-6 text-white rounded-full bg-blue-500"
                  v-if="dobEdit == true"
                  @click="dobEdit = false & updateInfo()"
                >
                  Save
                </button>
              </div>
            </div>
            <button
              class="text-left my-4 text-blue-600 font-semibold"
              style="width: 25%"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <div
        class="bg-white col-span-6 shadow-lg mb-5 px-6 py-4 flex flex-col gap-y-4 h-full"
        v-show="activeTab === 'ListAddr'"
        id="address_list"
      >
        <p class="font-semibold text-xl">Manage Addresses</p>
        <div
          class="border border-gray-200 px-6 py-2 text-blue-500 font-semibold"
        >
          <button>+ ADD A NEW ADDRESS</button>
        </div>
        <div
          class="border border-gray-200 px-6 py-6 font-semibold flex flex-col gap-y-2"
          v-for="address in addressInfo"
          :key="address"
        >
          <span
            class="bg-gray-200 px-2 py-1 w-max text-gray-700"
            style="font-size: 10px"
            >{{ address.addr_type }}</span
          >
          <div class="flex flex-row gap-x-4 items-center">
            <span
              >{{ address.addr_first_name }} {{ address.addr_last_name }}</span
            >
            <span class="font-light">{{ address.addr_mobile_num }}</span>
          </div>
          <span class="font-light">
            {{ address.addr_street_addr }} , {{ address.addr_additional }} ,
            Near {{ address.addr_landmark }} , {{ address.addr_city }} ,
            {{ address.addr_state }} , {{ address.addr_country }} -
            {{ address.addr_pin }}
          </span>
        </div>
      </div>
      <div
        class="bg-white col-span-6 shadow-lg mb-5 hidden"
        id="address_info"
        v-if="(activeTab === 'EditAddr') & (addressId > 0)"
      >
        <div class="pl-6 pt-5">
          <div class="flex flex-col">
            <div class="flex flex-row items-center">
              <p class="font-medium text-2xl font-product-sans">Edit Address</p>
              <button class="text-white bg-gray-400 ml-20 py-2 px-5 rounded">
                Cancel
              </button>
              <button class="text-white bg-blue-500 ml-2 py-2 px-6 rounded">
                Edit
              </button>
            </div>
            <div class="py-4 grid grid-cols-8 gap-y-3">
              <span>First Name</span>
              <div class="col-span-7">
                <input
                  id="addr_first_name"
                  type="text"
                  class="colspan-5 p-2 ml-3 bg-gray-100 border-gray-300 rounded border w-2/3"
                  v-model="addressInfo[addressId].addr_first_name"
                />
              </div>

              <span>Last Name</span>
              <div class="col-span-7">
                <input
                  id="addr_last_name"
                  type="text"
                  class="colspan-5 p-2 ml-3 bg-gray-100 border-gray-300 rounded border w-2/3"
                  v-model="addressInfo[addressId].addr_last_name"
                />
              </div>

              <span>Mobile No</span>
              <div class="col-span-7">
                <input
                  id="addr_numer"
                  type="text"
                  class="colspan-5 p-2 ml-3 bg-gray-100 border-gray-300 rounded border w-2/3"
                  v-model="addressInfo[addressId].addr_mobile_num"
                />
              </div>

              <span>Street Address</span>
              <div class="col-span-7">
                <input
                  id="addr_street_addr"
                  type="text"
                  class="colspan-5 p-2 ml-3 bg-gray-100 border-gray-300 rounded border w-2/3"
                  v-model="addressInfo[addressId].addr_street_addr"
                />
              </div>

              <span>Landmark</span>
              <div class="col-span-7">
                <input
                  id="addr_landmark"
                  type="text"
                  class="colspan-5 p-2 ml-3 bg-gray-100 border-gray-300 rounded border w-2/3"
                  v-model="addressInfo[addressId].addr_landmark"
                />
              </div>

              <span>Additional Address</span>
              <div class="col-span-7">
                <input
                  id="addr_additional"
                  type="text"
                  class="colspan-5 p-2 ml-3 bg-gray-100 border-gray-300 rounded border w-2/3"
                  v-model="addressInfo[addressId].addr_additional"
                />
              </div>

              <span>City</span>
              <div class="col-span-7">
                <input
                  id="addr_city"
                  type="text"
                  class="colspan-5 p-2 ml-3 bg-gray-100 border-gray-300 rounded border w-2/3"
                  v-model="addressInfo[addressId].addr_city"
                />
              </div>

              <span>Pin Code</span>
              <div class="col-span-7">
                <input
                  id="addr_pin"
                  type="text"
                  class="colspan-5 p-2 ml-3 bg-gray-100 border-gray-300 rounded border w-2/3"
                  v-model="addressInfo[addressId].addr_pin"
                />
              </div>

              <span>Country</span>
              <div class="col-span-7">
                <input
                  id="addr_country"
                  type="text"
                  class="colspan-5 p-2 ml-3 bg-gray-100 border-gray-300 rounded border w-2/3"
                  v-model="addressInfo[addressId].addr_country"
                />
              </div>

              <span>State</span>
              <div class="col-span-7">
                <input
                  id="addr_state"
                  type="text"
                  class="colspan-5 p-2 ml-3 bg-gray-100 border-gray-300 rounded border w-2/3"
                  v-model="addressInfo[addressId].addr_state"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";

export default {
  name: "UserInfo",
  data() {
    return {
      userInfo: [],
      addressInfo: [],
      addressId: 0,
      avatarUrl: "",
      personalInfoEdit: false,
      emailEdit: false,
      mobileEdit: false,
      dobEdit: false,
      showPasswordDialogue: false,
      userPassword: "",
      activeTab: "ListAddr",
    };
  },
  components: {
    Navbar,
  },
  mounted() {
    this.fetchInfo();
    this.fetchAddress();
    this.avatarUrl = sessionStorage.getItem("user_profile_pic");
  },
  methods: {
    async fetchInfo() {
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "session_token",
        sessionStorage.getItem("user_session_token")
      );
      bodyFormData.append("mode", "list");
      // Fetch all user info
      const config = {
        url: "/profileinfo.php",
        method: "post",
        data: bodyFormData,
      };
      await this.$req.request(config).then(function (response) {
        component.userInfo = response.data;
      });
    },
    async updateInfo() {
      if (this.userPassword === "") {
        this.showPasswordDialogue = true;
        return;
      }
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "session_token",
        sessionStorage.getItem("user_session_token")
      );
      bodyFormData.append("first_name", this.userInfo.first_name);
      bodyFormData.append("last_name", this.userInfo.last_name);
      bodyFormData.append("user_gender", this.userInfo.user_gender);
      bodyFormData.append("user_email", this.userInfo.user_email);
      bodyFormData.append("user_mobile_num", this.userInfo.user_mobile_num);
      bodyFormData.append("user_dob", this.userInfo.user_dob);
      bodyFormData.append("mode", "update");
      bodyFormData.append("user_password", this.userPassword);
      // Fetch all user info
      const config = {
        url: "/profileinfo.php",
        method: "post",
        data: bodyFormData,
      };
      await this.$req
        .request(config)
        .then(function () {
          component.showPasswordDialogue = false;
        })
        .catch(function (error) {
          if (error.response.statusText === "Wrong Password") {
            component.userPassword = "";
            component.showPasswordDialogue = true;
          }
        });
    },
    async fetchAddress() {
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "session_token",
        sessionStorage.getItem("user_session_token")
      );
      bodyFormData.append("mode", "list");
      // Fetch all user saved addresses
      const config = {
        url: "/addaddress.php",
        method: "post",
        data: bodyFormData,
      };
      await this.$req.request(config).then(function (response) {
        component.addressInfo = response.data;
      });
    },
    async insertAddress() {
      const bodyFormData = new FormData();
      bodyFormData.append(
        "session_token",
        sessionStorage.getItem("user_session_token")
      );
      bodyFormData.append("mode", "insert");
      bodyFormData.append("addr_first_name", this.userInfo.addr_first_name);
      bodyFormData.append("addr_last_name", this.userInfo.addr_last_name);
      bodyFormData.append("addr_country_code", this.userInfo.addr_country_code);
      bodyFormData.append("addr_mobile_num", this.userInfo.addr_mobile_num);
      bodyFormData.append("addr_street_addr", this.userInfo.addr_street_addr);
      bodyFormData.append("addr_landmark", this.userInfo.addr_landmark);
      bodyFormData.append("addr_additional", this.userInfo.addr_additional);
      bodyFormData.append("addr_city", this.userInfo.addr_city);
      bodyFormData.append("addr_state", this.userInfo.addr_state);
      bodyFormData.append("addr_country", this.userInfo.addr_country);
      bodyFormData.append("addr_type", this.userInfo.addr_type);
      bodyFormData.append("addr_pin", this.userInfo.addr_pin);
      const config = {
        url: "/addaddress.php",
        method: "post",
        data: bodyFormData,
      };
      await this.$req.request(config).then(function () {});
    },
  },
};
</script>

<style></style>
