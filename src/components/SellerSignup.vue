<template>
  <div class="static">
    <!-- Signup Error Alert Start -->
    <div class="absolute w-full mt-10" v-show="AuthError">
      <div
        class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
      >
        <div class="flex items-center justify-center w-12 bg-red-500">
          <svg
            class="w-6 h-6 text-white fill-current"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
            />
          </svg>
        </div>

        <div class="px-4 py-2 -mx-3">
          <div class="mx-3">
            <span
              class="font-semibold text-red-500 dark:text-red-400 font-product-sans"
              >Error</span
            >
            <p class="text-sm text-gray-600 dark:text-gray-200">
              Email already exists
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Signup Error End -->
    <div class="flex h-screen justify-center items-center">
      <div
        class="flex flex-row max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl w-full"
      >
        <div
          class="hidden bg-cover lg:block lg:w-1/2"
          style="
            background-image: url('https://media.timeout.com/images/100479313/image.jpg');
          "
        ></div>

        <div class="w-full px-6 py-3 md:px-4 lg:w-1/2">
          <h2
            class="text-2xl font-semibold text-center text-gray-700 dark:text-white font-product-sans"
          >
            The Sports Place
          </h2>

          <p
            class="text-xl text-center text-gray-600 dark:text-gray-200 font-product-sans"
          >
            Create your Merchant Account
          </p>
          <br />
          <form name="signup_form">
            <div class="mt-4 space-x-2">
              <input
                id="signup_first_name"
                class="w-48 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
                placeholder="First name"
                required
                pattern="[\w]{3,20}"
                title="A-Z a-z Upto 30 letters"
                v-model="FirstName"
              />

              <input
                id="signup_last_name"
                style="width: 210px"
                class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
                placeholder="Last name"
                required
                pattern="[\w]{3,20}"
                title="A-Z a-z Upto 30 letters"
                v-model="LastName"
              />

              <p id="signup_name_error" class="text-red-500 text-sm"></p>
            </div>
            <br />

            <div class="mt-4">
              <input
                id="signup_email"
                class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="email"
                placeholder="Enter Email"
                required
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                title="Must be of the form personal_info@domain "
                v-model="SellerEmail"
              />
            </div>

            <br />

            <div class="mt-4">
              <input
                id="signup_seller_org"
                class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
                placeholder="Enter Organization Name"
                pattern="[\w ]{3,30}"
                title="Must only contan alphabets and spaces upto 30 letters"
                v-model="OrgName"
              />
            </div>

            <br />

            <div class="mt-4 space-x-2">
              <input
                id="signup_pass"
                class="w-48 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
                placeholder="Enter a Password"
                required
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                title="Minimum eight characters, at least one letter, one number and one special character"
                v-model="Password"
              />

              <input
                id="signup_confirm_pass"
                class="w-48 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
                placeholder="Confirm Password"
                required
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                title="Minimum eight characters, at least one letter, one number and one special character"
                v-model="ConfirmPassword"
              />
            </div>
            <br />
            <div class="mt-8">
              <button
                type="button"
                id="submit_button"
                class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600 font-product-sans"
                @click="Submit"
              >
                Signup
              </button>
            </div>

            <div class="flex items-center justify-between mt-4">
              <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

              <router-link
                to="/sellers/login"
                class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline font-product-sans"
                >or sign in</router-link
              >

              <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SellerSignup",
  data() {
    return {
      SellerEmail: "",
      Password: "",
      ConfirmPassword: "",
      FirstName: "",
      LastName: "",
      OrgName: "",
      AuthError: false,
    };
  },
  methods: {
    async Submit() {
      if (document.forms["signup_form"].checkValidity()) {
        if (this.Password != this.ConfirmPassword) {
          document
            .getElementById("signup_confirm_pass")
            .setCustomValidity("Both Passwords Must be same");
          return;
        }
        document.getElementById("signup_confirm_pass").setCustomValidity("");
        const component = this;
        const bodyFormData = new FormData();
        bodyFormData.append("auth_first_name", this.FirstName);
        bodyFormData.append("auth_last_name", this.LastName);
        bodyFormData.append("auth_org_name", this.OrgName);
        bodyFormData.append("auth_email", this.SellerEmail);
        bodyFormData.append("auth_pass", this.Password);
        bodyFormData.append("sign_in", false);
        await axios({
          url: "http://localhost:80/sports_place/helpers/seller_auth.php",
          method: "post",
          data: bodyFormData,

          headers: { "Content-Type": "multipart/form-data" },
        })
          // eslint-disable-next-line no-unused-vars
          .then(function (response) {
            this.AuthError = false;
            component.$router.push({ path: "/sellers/login" });
          })
          .catch(function (error) {
            if (error.response.status == 403) {
              component.AuthError = true;
            }
          });
      } else {
        document.forms["signup_form"].reportValidity();
      }
    },
  },
};
</script>

<style scoped>
input:invalid {
  outline: rgb(239 68 68) solid 2px;
}
input:valid {
  outline: rgb(96 165 250) solid 2px;
}
</style>
