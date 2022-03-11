<template>
  <div class="bg-gray-100 h-full">
    <navbar />
    <div class="flex flex-col items-center py-10 px-36 h-full">
      <div class="bg-white flex flex-col items-center gap-y-6 px-6 py-4 w-full">
        <span class="text-3xl font-semibold font-product-sans"
          >404 Page Not found</span
        >
        <span class="text-xl"
          >We can't seem to find the page you're looking for</span
        >
        <router-link to="/" class="border-blue-500 border-2 w-36 px-6 py-2"
          >Go to Home</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  name: "ErrorPage",
  components: {
    Navbar,
  },
};
</script>
