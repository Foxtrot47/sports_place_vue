<template>
  <div class="h-full">
    <div
      class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 transform transition duration-500 ease-in-out"
      style="z-index: 1; position: absolute; top: -10%; left: 35%"
      id="failed_auth_alert"
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
          <span class="font-semibold text-red-500 dark:text-red-400"
            >Error</span
          >
          <p class="text-sm text-gray-600 dark:text-gray-200">
            You typed wrong email or password
          </p>
        </div>
      </div>
    </div>

    <!-- Registration Success Alert -->
    <div
      class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 transform transition duration-500 ease-in-out"
      style="z-index: 1; position: absolute; top: -13%; left: 35%"
      id="success_auth_alert"
    >
      <div class="flex items-center justify-center w-12 bg-green-500">
        <svg
          class="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"
          />
        </svg>
      </div>

      <div class="px-4 py-2 -mx-3">
        <div class="mx-3">
          <span class="font-semibold text-green-500 dark:text-green-400"
            >Success</span
          >
          <p class="text-sm text-gray-600 dark:text-gray-200">
            Your account was registered!
          </p>
        </div>
      </div>
    </div>

    <div class="flex h-screen justify-center items-center">
      <div
        class="flex max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl w-full"
      >
        <div
          class="hidden bg-cover lg:block lg:w-1/2"
          style="
            background-image: url('https://media.timeout.com/images/100479313/image.jpg');
          "
        ></div>

        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <h2
            class="text-2xl font-semibold text-center text-gray-700 dark:text-white"
          >
            The Sports Place
          </h2>

          <p class="text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>

          <div class="flex items-center justify-between mt-4">
            <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a
              class="text-xs text-center text-gray-500 uppercase dark:text-gray-400"
              >Sign in with email</a
            >

            <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <form name="loginform">
            <div class="mt-4">
              <label
                class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="auth_email"
                >Email Address</label
              >
              <input
                id="auth_email"
                class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring"
                type="email"
                v-model="UserEmail"
                placeholder="Enter email address"
                required
                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                title="Must be of the form personal_info@domain "
              />
            </div>

            <div class="mt-4">
              <div class="flex justify-between">
                <label
                  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  for="auth_pass"
                  >Password</label
                >
                <!-- Dummy Since i don't have any mail service -->
                <a
                  href="#"
                  class="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                  >Forgot Password?</a
                >
              </div>

              <input
                id="auth_pass"
                class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
                type="password"
                v-model="Password"
                placeholder="Enter Password"
                required
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                title="Minimum eight characters, at least one letter, one number and one special character"
              />
            </div>
          </form>

          <div class="mt-8">
            <button
              type="button"
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              id="submit_button"
              @click="Submit"
            >
              Login
            </button>
          </div>

          <div class="flex items-center justify-between mt-4">
            <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <router-link
              to="/users/signup"
              class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              >or sign up</router-link
            >

            <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "md5";

export default {
  name: "UserLogin",
  data() {
    return {
      UserEmail: "",
      Password: "",
      AuthError: false,
      AccDuplicateError: false,
    };
  },
  methods: {
    async Submit() {
      if (document.forms["loginform"].checkValidity()) {
        const component = this;
        const bodyFormData = new FormData();
        bodyFormData.append("auth_email", this.UserEmail);
        bodyFormData.append("auth_pass", this.Password);
        bodyFormData.append("sign_in", true);
        await axios({
          url: "http://localhost:80/sports_place/helpers/user_auth.php",
          method: "post",
          data: bodyFormData,

          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            console.log(response);
            sessionStorage.setItem(
              "user_session_token",
              response.data.user_session_token
            );
            sessionStorage.setItem("user_email", component.UserEmail);
            sessionStorage.setItem("first_name", response.data.first_name);
            sessionStorage.setItem("last_name", response.data.last_name);
            var pp =
              "https://www.gravatar.com/avatar/" +
              md5(component.UserEmail.toLowerCase());

            sessionStorage.setItem("profile_pic", pp);
            component.$router.push({ path: "/" });
            this.AuthError = false;
            return;
          })
          .catch(function (error) {
            if (error.response.status == 403) {
              component.AuthError = true;
            }
          });
      } else {
        document.forms["loginform"].reportValidity();
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
