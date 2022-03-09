<template>
  <form method="post">
    <div class="grid grid-cols-8 ml-10 mr-10 gap-4 mt-5">
      <div class="col-span-2">
        <div class="flex flex-col">
          <div class="flex flex-row bg-white p-3 items-center shadow-md mb-5">
            <img src="" class="rounded-3xl" />
            <p class="pl-3 font-semibold"></p>
          </div>
          <div class="flex flex-col bg-white py-4 shadow-md">
            <div class="flex flex-row pl-6 py-2">
              <img src="images/shipping_black_24dp.svg" />
              <router-link
                class="font-semibold pl-4"
                style="color: #878787"
                to="/sellers/mylistings"
              >
                MY LISTINGS
              </router-link>
            </div>
            <div class="flex flex-row pl-6 py-2">
              <img src="images/person_black_24dp.svg" />
              <p class="font-semibold pl-4" style="color: #878787">
                ACCOUNT SETTINGS
              </p>
            </div>
            <div class="flex flex-row pl-16 bg-blue-50 py-2">
              <p class="font-semibold text-blue-500">Profile Information</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white col-span-6 shadow-lg mb-5" id="personal_info">
        <div class="pl-6 pt-5">
          <div class="flex flex-col">
            <div class="pb-4">
              <p class="font-semibold text-xl">Personal Information</p>
              <div class="py-4 flex flex-row gap-2">
                <input
                  type="text"
                  class="p-2 bg-gray-100 border-gray-300 rounded border antialiased"
                  disabled
                />
                >
                <input
                  type="text"
                  class="p-2 bg-gray-100 border-gray-300 rounded border antialiased"
                  disabled
                />
              </div>
              <p class="text-sm">Your Gender</p>
              <input
                type="radio"
                id="male_radio"
                name="gender"
                value="m"
                disabled
              />
              <label class="text-lg px-2" for="male_radio">Male</label>
              <input
                type="radio"
                id="female_radio"
                name="gender"
                value="f"
                disabled
              />
              <label class="text-lg px-2" for="female_radio">Female</label>
              <input
                type="radio"
                id="nonb_radio"
                name="gender"
                value="n"
                disabled
              />
              <label class="text-lg px-2" for="nonb_radio">Nonbinary</label>
            </div>
            <div class="pt-4">
              <p class="font-semibold text-xl">Email Address</p>
              <div class="py-4 flex flex-row gap-2">
                <input
                  type="text"
                  class="p-2 bg-gray-100 border-gray-300 rounded border antialiased"
                  disabled
                />
                >
              </div>
            </div>
            <div class="pt-6">
              <p class="font-semibold text-xl">Mobile Number</p>
              <div class="py-4 flex flex-row gap-2">
                <input
                  type="number"
                  class="p-2 bg-gray-100 border-gray-300 rounded border antialiased"
                  disabled
                />
                >
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
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "SellerProfileInfo",
  data() {
    return {
      SellerInfo: {
        FirstName: "",
        LastName: "",
        Gender: "",
        EmailAddress: "",
        PhoneNumber: 0,
      },
    };
  },
  methods: {
    fetchData() {
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "seller_session_token",
        sessionStorage.getItem("seller_session_token")
      );
      // Send a request to our API and receive json data containing all listings made by the seller
      axios({
        url: "http://localhost:80/sports_place/api/seller_profile.php",
        method: "post",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        component.FirstName = response.data.first_name;
        component.LastName = response.data.last_name;
        component.Gender = response.data.seller_gender;
        component.PhoneNumber = response.data.seller_email;
      });
    },
  },
};
</script>
