<template>
  <div class="flex flex-col h-full bg-gray-200">
    <div class="flex flex-row flex-none justify-between items-end p-4 bg-white">
      <div class="flex flex-col gap-y-2 font-product-sans">
        <router-link to="/" class="text-blue-500 hover:text-blue-400">
          Home <span class="text-black hover:text-black"> &gt; </span>
        </router-link>
        <p class="text-3xl text-black">Approve Sellers</p>
      </div>
    </div>

    <div class="mt-2 h-full">
      <div class="mx-10 mt-5 mb-10">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden shadow-md sm:rounded-lg">
                <table class="min-w-full">
                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        <div>Seller ID</div>
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        <div>Seller Name</div>
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        <div>Seller Gender</div>
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        <div>Seller Organisation</div>
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        <div>Approval Status</div>
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      v-for="seller in sellersList"
                      :key="seller.seller_id"
                    >
                      <td
                        class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white gap-x-2"
                      >
                        <p>{{ seller.seller_id }}</p>
                      </td>
                      <td
                        class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white gap-x-2"
                      >
                        <p>{{ seller.first_name }} {{ seller.last_name }}</p>
                      </td>
                      <td
                        class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white gap-x-2"
                      >
                        <p>{{ seller.seller_gender }}</p>
                      </td>
                      <td
                        class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white gap-x-2"
                      >
                        <p>{{ seller.seller_org }}</p>
                      </td>
                      <td
                        class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white gap-x-2"
                      >
                        <p v-if="seller.verified == 1">Approved</p>
                        <p v-if="seller.verified == 0">Not Approved</p>
                      </td>
                      <td
                        class="text-lg gap-x-4 flex flex-row items-center content-center items-center h-full"
                      >
                        <button
                          class="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded"
                          v-on:click="changeSellerStatus(seller.seller_id, 1)"
                          v-if="seller.verified == 0"
                        >
                          Approve Request
                        </button>
                        <button
                          class="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                          v-on:click="changeSellerStatus(seller.seller_id, 0)"
                          v-if="seller.verified == 1"
                        >
                          Reject Approval
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminApprovals",
  data() {
    return {
      sellersList: null,
    };
  },
  methods: {
    async fetchSellersList() {
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "admin_session_token",
        sessionStorage.getItem("admin_session_token")
      );
      bodyFormData.append("mode", "list");
      const config = {
        url: "/admin_actions.php",
        method: "post",
        data: bodyFormData,
      };
      await this.$req.request(config).then(function (response) {
        component.sellersList = response.data;
      });
    },
    async changeSellerStatus(seller_id, response) {
      const component = this;
      if (seller_id == null) return;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "admin_session_token",
        sessionStorage.getItem("admin_session_token")
      );
      bodyFormData.append("mode", "update");
      bodyFormData.append("seller_id", seller_id);
      bodyFormData.append("admin_response", response);

      const config = {
        url: "/admin_actions.php",
        method: "post",
        data: bodyFormData,
      };
      await this.$req.request(config).then(function () {
        component.fetchSellersList();
      });
    },
  },
  mounted() {
    this.fetchSellersList();
  },
};
</script>
