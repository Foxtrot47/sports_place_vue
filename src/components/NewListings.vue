<template>
  <div class="flex flex-col h-full font-roboto bg-gray-100 gap-y-2">
    <div
      class="flex-none w-full flex flex-col px-8 pt-3 section bg-white text-black shadow"
    >
      <div>
        <router-link to="/sellers/mylistings">
          <span class="text-blue-500 pr-1">My Listings</span>
        </router-link>
        &gt;
        <span
          class="text-blue-500 pr-1"
          v-if="productInfo.product_full_name != ''"
          >Edit Listing</span
        >
        <span class="text-blue-500 pr-1" v-else>New Listing</span>
      </div>
      <div class="pt-2 pb-4">
        <p
          v-if="productInfo.product_full_name != ''"
          class="text-3xl font-product-sans text-black"
        >
          Edit Listing
        </p>
        <p v-else class="text-3xl font-product-sans text-black">
          Add a new Listing
        </p>
      </div>
    </div>

    <!-- Side Nav Start -->
    <div class="flex flex-row flex-initial h-full">
      <div
        class="w-3/12 section px-5 py-4 mr-2 flex flex-col gap-y-6 bg-white rounded-xl shadow-sm text-lg"
      >
        <div class="flex flex-row text-lg items-center">
          <svg
            class="mr-2"
            width="1.25rem"
            height="1.25rem"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#1c1b1f"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z"
            />
          </svg>
          <button
            class="text-on-surface"
            type="button"
            id="section_btn1"
            @click="switchsection(1)"
          >
            Select Category
          </button>
        </div>
        <hr class="border-top border-gray-300" />
        <div class="flex flex-row items-center">
          <i class="fas fa-tag mr-2"></i>
          <button
            class="text-on-surface"
            disabled
            id="section_btn2"
            @click="switchsection(2)"
            type="button"
          >
            Select Brand
          </button>
        </div>
        <hr class="border-top border-gray-300" />
        <div class="flex flex-row items-center">
          <i class="fas fa-info mr-4"></i>
          <button
            class="text-on-surface"
            id="section_btn3"
            @click="switchsection(3)"
            type="button"
          >
            Add Product Info
          </button>
        </div>
        <hr class="border-top border-gray-300" />
      </div>
      <!-- Side Nav End -->

      <div class="flex flex-row w-full">
        <transition name="fade">
          <!-- Brand Selection Area -->
          <div
            class="w-full flex flex-row mx-4 gap-x-2 h-72"
            id="section_2"
            v-show="CurrentSection == 2"
          >
            <div
              class="flex flex-col w-1/2 items-center block p-6 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <h5
                class="text-2xl text-left tracking-tight text-gray-900 dark:text-white font-product-sans"
              >
                Select Product Brand
              </h5>
              <div class="flex flex-row items-center mt-10">
                <input
                  type="text"
                  class="border-gray-300 rounded-l border"
                  v-model="productInfo.product_brand"
                />
                <input
                  type="button"
                  class="bg-blue-500 text-white py-2 px-2 h-full rounded-r border"
                  value="Select Brand"
                />
              </div>
            </div>
            <transition name="fade">
              <div
                :key="1"
                v-show="productInfo.product_brand != ''"
                class="flex flex-col w-1/2 text-center p-6 pt-20 gap-y-4 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <i class="fas fa-check-circle text-green-500"></i>
                <p class="text-xl font-product-sans">
                  {{ productInfo.product_brand }}
                </p>
                <p>You can start Selling under this brand</p>
                <div>
                  <button class="px-4 py-2 bg-blue-500 text-white max-w-20">
                    Continue
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </transition>

        <!-- Category Selection -->
        <transition name="fade">
          <div
            class="w-full flex flex-col ml-3 gap-y-2 h-full"
            id="section_1"
            v-show="CurrentSection == 1"
          >
            <div class="flex flex-row gap-x-4">
              <div
                class="bg-white text-black w-46 flex-none text-lg overflow-y-auto rounded-xl h-full shadow-sm"
              >
                <div
                  v-for="category in CategoryList"
                  :key="category.catid"
                  class=""
                >
                  <button
                    type="button"
                    v-on:click="selectcategory('cat', $event.target)"
                    class="w-full px-4 py-4 hover:bg-blue-400 hover:text-white"
                    v-bind:id="`cat_entry_${category.catname}`"
                  >
                    {{ category.catname }}
                  </button>
                </div>
              </div>
              <div
                class="bg-white w-40 flex-none text-lg overflow-y-auto rounded-xl h-full shadow-sm"
                id="sub_container"
              >
                <div
                  v-for="subcategory in SubCategoryList"
                  :key="subcategory.subcatid"
                  class=""
                >
                  <button
                    type="button"
                    v-on:click="selectcategory('subcat', $event.target)"
                    class="w-full px-4 py-4 hover:bg-blue-400 hover:text-white"
                    v-bind:id="`subcat_entry_${subcategory.subcatname}`"
                  >
                    {{ subcategory.subcatname }}
                  </button>
                </div>
                <p
                  class="md-label-large font-light text-center py-4"
                  v-if="SubCategoryList == null"
                >
                  Select a subcategory
                </p>
              </div>
              <div
                class="bg-white w-40 flex-none text-lg overflow-y-auto rounded-xl h-full shadow-sm"
                id="verical_container"
              >
                <!--
                <div
                  v-for="vertical in VerticalList"
                  :key="vertical.verticalid"
                  class=""
                >
                  <button
                    type="button"
                    v-on:click="selectcategory('vertical', $event.target)"
                    class="w-full px-4 py-4 hover:bg-blue-400 hover:text-white"
                    v-bind:id="`subcat_entry_${vertical.verticalname}`"
                  >
                    {{ vertical.verticalname }}
                  </button>
                </div>
                -->
                <p class="md-label-large font-light text-center py-4">
                  Work in Progress
                </p>
              </div>
              <transition name="fade">
                <div
                  class="bg-white w-full mr-5 py-4 flex flex-col items-center pt-20 gap-y-5 rounded-xl h-full w-full shadow-sm"
                  v-show="productInfo.product_sub_category != undefined"
                >
                  <i class="fas fa-check-circle text-green-500"></i>
                  <p class="text-xl font-product-sans">
                    {{ productInfo.product_sub_category }}
                  </p>
                  <p>You can start Selling under this subcategory</p>
                  <div>
                    <button class="px-4 py-2 bg-blue-500 text-white max-w-20">
                      Continue
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </transition>

        <!-- Product Info -->
        <transition name="fade">
          <div
            class="w-full flex flex-row gap-x-2 overflow-y-scroll"
            id="section_3"
            v-show="CurrentSection == 3"
          >
            <div
              class="flex flex-col px-6 py-5 rounded-xl gap-y-4 w-full bg-white"
            >
              <span class="text-2xl">Listing Photos</span>
              <div class="flex flex-col gap-y-2">
                <span class="text-sm">Enter Main Image Url</span>
                <textarea
                  placeholder="Enter URL"
                  required
                  class="focus:outline-0 border rounded bg-white border-outline py-2 px-2 w-full h-15 text-sm"
                  v-model="productInfo.product_main_image"
                ></textarea>
              </div>
              <div class="flex flex-col gap-y-2">
                <span class="text-sm">Enter Product Image Urls</span>
                <textarea
                  placeholder="Enter URLs seperated by space"
                  required
                  class="focus:outline-0 border rounded bg-white border-outline py-2 px-2 w-full h-32 text-sm"
                  v-model="productInfo.product_images"
                ></textarea>
              </div>
              <div class="flex flex-col gap-y-2">
                <span class="text-sm">Enter Feature Image Url</span>
                <textarea
                  placeholder="Enter URL"
                  required
                  class="focus:outline-0 border rounded bg-white border-outline py-2 px-2 w-full h-15 text-sm"
                  v-model="productInfo.product_features"
                ></textarea>
              </div>
            </div>
            <div class="flex flex-col gap-y-2">
              <div class="px-4 py-5 bg-white rounded-xl md-label-large">
                <div class="flex flex-row items-center pb-4 mb-1">
                  <span class="text-xl font-product-sans">Price and Stock</span>
                </div>
                <div class="flex flex-row gap-x-4">
                  <div class="flex flex-col gap-y-1">
                    <span class="md-label-medium">MRP</span>
                    <input
                      type="text"
                      name="listing_price"
                      required
                      id="listing_price"
                      class="focus:outline-0 border rounded bg-white border-outline py-2 px-2 w-64"
                      v-model="productInfo.product_price"
                    />
                  </div>
                  <div class="flex flex-col gap-y-1">
                    <span class="md-label-medium">Listing Status</span>
                    <select
                      name="listing_status"
                      required
                      id="listing_status"
                      class="focus:outline-0 border rounded bg-white border-outline py-2 px-2 w-64"
                      v-model="productInfo.product_listing_status"
                    >
                      <option value="in_stock">In Stock</option>
                      <option value="outofstock">Out Of Stock</option>
                      <option value="unavailable">Unavailable</option>
                    </select>
                  </div>
                </div>
                <div class="flex flex-col gap-y-1 mt-2">
                  <span class="md-label-medium">Stock Quantity</span>
                  <input
                    type="number"
                    name="listing_quantity"
                    id="listing_quantity"
                    required
                    class="focus:outline-0 border rounded bg-white border-outline py-2 px-2 w-64"
                    v-model="productInfo.product_quantity"
                  />
                </div>
              </div>
              <div class="px-4 py-5 bg-white rounded-xl md-label-large">
                <div class="flex flex-row items-center pb-4">
                  <span class="md-title-large">Listing Description</span>
                </div>
                <div class="flex flex-row gap-x-4 mb-4">
                  <div class="flex flex-col gap-y-1">
                    <span class="md-label-medium">Model Name</span>
                    <input
                      type="text"
                      name="listing_model_name"
                      id="listing_model_name"
                      class="focus:outline-0 border rounded bg-white border-outline py-2 px-2 w-64"
                      required
                      onkeyup="show_submit_area()"
                      v-model="productInfo.product_full_name"
                    />
                  </div>
                  <div class="flex flex-col gap-y-1">
                    <span class="md-label-medium">Size</span>
                    <input
                      required
                      type="text"
                      name="listing_size"
                      id="listing_size"
                      class="focus:outline-0 border rounded bg-white border-outline py-2 px-2 w-64"
                      v-model="productInfo.product_size"
                    />
                  </div>
                </div>
                <div class="flex flex-row gap-x-4">
                  <div class="flex flex-col gap-y-1">
                    <span class="md-label-medium">Color</span>
                    <input
                      type="text"
                      name="listing_color"
                      id="listing_color"
                      class="focus:outline-0 border rounded bg-white border-outline py-2 px-2 w-64"
                    />
                  </div>
                  <div class="flex flex-col gap-y-1">
                    <span class="md-label-medium">For</span>
                    <select
                      required
                      name="listing_fitfor"
                      id="listing_fitfor"
                      class="focus:outline-0 border rounded bg-white border-outline py-2 px-2 w-64"
                      v-model="productInfo.product_fitfor"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="maf">Male & Female</option>
                      <option value="kids">Kids</option>
                      <option value="all">All</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fade">
      <div
        class="flex flex-row justify-between flex-none bg-white px-6 py-5 rounded-xl text-lg"
        id="submit_indicator"
        v-show="productInfo.product_full_name != ''"
      >
        <div class="flex flex-row align-middle gap-x-2 items-center">
          <i class="far fa-check-circle text-green-500"></i>
          <p class="font-light">Product</p>
          <p>{{ productInfo.product_full_name }}</p>
        </div>
        <div class="">
          <button
            type="submit"
            class="text-white text-xl p-2 rounded border bg-blue-500"
            onclick="submitproduct()"
          >
            Submit
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "NewListings",
  data() {
    return {
      OldProductId: Number(this.productid),
      productInfo: { product_id: 0, product_full_name: "", product_brand: "" },
      CategoryList: Array,
      SubCategoryList: null,
      PrevCategoryElementId: 0,
      PrevSubCategoryElementId: 0,
      CurrentSection: 1,
    };
  },
  props: {
    productid: {
      type: String,
    },
  },
  async mounted() {
    await this.fillCategories();
    await this.fillData();
    if (
      this.productInfo != undefined &&
      this.productInfo.product_main_category != undefined
    ) {
      const element = document.getElementById(
        "cat_entry_" + this.productInfo.product_main_category
      );
      this.selectcategory("cat", element);
      await this.fillCategories("subcat");
      console.log(this.productInfo.product_sub_category);
      if (this.productInfo.product_sub_category != undefined) {
        const element = document.getElementById(
          "subcat_entry_" + this.productInfo.product_sub_category
        );
        this.selectcategory("subcat", element);
      }
    }
  },
  methods: {
    async fillData() {
      if (!this.OldProductId > 0) return;
      var component = this;
      var bodyFormData = new FormData();
      bodyFormData.append(
        "seller_session_token",
        sessionStorage.getItem("seller_session_token")
      );
      bodyFormData.append("mode", "view");
      bodyFormData.append("product_id", this.OldProductId);
      await axios({
        url: "http://localhost:80/sports_place/helpers/listing_helper.php",
        method: "post",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        response.data.forEach((fields) => {
          component.productInfo = fields;
        });
      });
    },
    async fillCategories(category_type) {
      var component = this;
      var bodyFormData = new FormData();
      bodyFormData.append(
        "seller_session_token",
        sessionStorage.getItem("seller_session_token")
      );
      bodyFormData.append("mode", "list_cat");
      if (category_type == "subcat")
        bodyFormData.append(
          "product_maain_category",
          this.productInfo.product_main_category
        );
      await axios({
        url: "http://localhost:80/sports_place/helpers/listing_helper.php",
        method: "post",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        if (category_type == "subcat")
          component.SubCategoryList = response.data;
        else component.CategoryList = response.data;
      });
    },
    sendData() {
      var bodyFormData = new FormData();
      bodyFormData.append("session_token", "94e8a84a4ab2c5257effbc3af37d8096");
      bodyFormData.append("mode", "add");
      bodyFormData.append(
        "listing_model_name",
        this.productInfo.product_full_name
      );
      bodyFormData.append(
        "listing_main_image_url",
        this.productInfo.product_main_image
      );
      bodyFormData.append(
        "listing_images_urls",
        this.productInfo.product_images
      );
      bodyFormData.append(
        "listing_feature_url",
        this.productInfo.product_features
      );
      bodyFormData.append("listing_price", this.productInfo.product_price);
      bodyFormData.append(
        "listing_status",
        this.productInfo.product_listing_status
      );
      bodyFormData.append("listing_size", this.productInfo.product_size);
      bodyFormData.append("listing_fitfor", this.productInfo.product_fitfor);
      //bodyFormData.append("listing_color", this.productInfo.product_price);
      bodyFormData.append(
        "listing_cat",
        this.productInfo.product_main_category
      );
      bodyFormData.append(
        "listing_subcat",
        this.productInfo.product_sub_category
      );

      axios({
        url: "http://localhost:80/sports_place/helpers/listing_helper.php",
        method: "post",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        console.log(response);
      });
    },
    selectcategory(category_type, element) {
      if (category_type === "subcat") {
        if (this.PrevSubCategoryElementId != 0) {
          try {
            document
              .getElementById(this.PrevSubCategoryElementId)
              .classList.toggle("bg-blue-500");
            document
              .getElementById(this.PrevSubCategoryElementId)
              .classList.toggle("text-white");
            document
              .getElementById(this.PrevSubCategoryElementId)
              .classList.toggle("hover:bg-blue-400");
          } catch {
            // Do nothing hide if the element exist lol
          }
        }
        this.productInfo.product_sub_category = element.innerHTML;
        this.PrevSubCategoryElementId = element.id;
        document.getElementById("section_btn2").disabled = false;
      } else {
        if (this.PrevCategoryElementId != 0) {
          document
            .getElementById(this.PrevCategoryElementId)
            .classList.remove("bg-blue-500");
          document
            .getElementById(this.PrevCategoryElementId)
            .classList.remove("text-white");
          document
            .getElementById(this.PrevCategoryElementId)
            .classList.add("hover:bg-blue-400");
          this.productInfo.product_sub_category = undefined;
        }
        this.productInfo.product_main_category = element.innerHTML;
        this.PrevCategoryElementId = element.id;
        this.fillCategories("subcat");
      }

      element.classList.remove("hover:bg-blue-400");
      element.classList.add("bg-blue-500");
      element.classList.add("text-white");
    },
    switchsection(section) {
      // First Set the value to 0 start exit transition of prev element
      // Then set the CurrentSectiion value after .5s to start next transition
      // Now Both element doesn't exist at same time and mess up flexbox layout
      this.CurrentSection = 0;
      setTimeout(() => {
        this.CurrentSection = section;
      }, 500);
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.75s ease-out;
}

.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -50%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}
</style>
