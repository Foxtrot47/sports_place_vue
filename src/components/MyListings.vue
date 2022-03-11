<template>
  <div class="flex flex-col h-full bg-gray-200">
    <div class="flex flex-row flex-none justify-between items-end p-4 bg-white">
      <div class="flex flex-col gap-y-2 font-product-sans">
        <router-link to="/" class="text-blue-500 hover:text-blue-400">
          Home <span class="text-black hover:text-black"> &gt; </span>
        </router-link>
        <p class="text-2xl text-black">Listings Management</p>
      </div>
      <div class="bg-blue-500 max-h-10">
        <button class="button px-2 py-2 text-white">
          <router-link to="/sellers/newlisting"> Add new listing </router-link>
        </button>
      </div>
    </div>

    <div class="bg-white mt-2 h-full">
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
                        <div
                          v-on:click="this.ChangeFilter('product_full_name')"
                        >
                          Product Name
                        </div>
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        <div v-on:click="this.ChangeFilter('product_price')">
                          Product Price
                        </div>
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        <div v-on:click="this.ChangeFilter('product_quantity')">
                          Product Stock
                        </div>
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
                      v-for="product in productsList"
                      :key="product.productid"
                    >
                      <td
                        class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row items-center gap-x-2"
                      >
                        <img
                          class="w-16"
                          v-bind:src="product.product_main_image"
                        />
                        <p>{{ product.product_full_name }}</p>
                      </td>
                      <td
                        class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"
                      >
                        {{ product.product_price }}
                      </td>
                      <td
                        class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400"
                      >
                        {{ product.product_quantity }}
                      </td>
                      <td
                        class="text-lg gap-x-4 items-start content-center items-center h-full"
                      >
                        <router-link
                          class="mx-5"
                          :to="`/sellers/newlisting/${product.product_id}`"
                        >
                          <i class="fas fa-edit text-green-500"></i>
                        </router-link>
                        <button v-on:click="deleteProduct(product.product_id)">
                          <i class="fas fa-trash-alt text-red-500"></i>
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
  name: "MyListings",
  data() {
    return {
      productsList: null,
      sort: { sortCol: "product_id", sortOrder: "ASC" },
    };
  },
  methods: {
    async fetchProducts() {
      const component = this;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "seller_session_token",
        sessionStorage.getItem("seller_session_token")
      );
      bodyFormData.append("mode", "list");
      bodyFormData.append("sort_by", this.sort.sortCol);
      bodyFormData.append("sort_order", this.sort.sortOrder);
      // Send a request to our  and receive json data containing all listings made by the seller
      const config = {
        url: "/listing_helper.php",
        method: "post",
        data: bodyFormData,
      };
      await this.$req
        .request(config)
        .then(function (response) {
          component.productsList = response.data;
        })
        .catch(function (error) {
          if (error.response.statusText == "Session Token Invalid") {
            component.$router.push("/sellers/login");
          }
        });
    },
    async deleteProduct(product_id) {
      const component = this;
      if (product_id == null) return;
      const bodyFormData = new FormData();
      bodyFormData.append(
        "seller_session_token",
        sessionStorage.getItem("seller_session_token")
      );
      bodyFormData.append("mode", "delete");
      bodyFormData.append("product_id", product_id);

      const config = {
        url: "/listing_helper.php",
        method: "post",
        data: bodyFormData,
      };
      await this.$req.request(config).then(function () {
        component.fetchProducts();
      });
    },
    assignSubCatName(id) {
      this.$cat_list["subcategories"].forEach((subcat) => {
        if (id === subcat.subcatid) {
          return subcat.subcatname;
        }
      });
    },
    ChangeFilter(coloumnName) {
      this.sort.sortCol = coloumnName;
      this.sort.sortOrder = this.sort.sortOrder === "ASC" ? "DESC" : "ASC";
      this.fetchProducts();
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
