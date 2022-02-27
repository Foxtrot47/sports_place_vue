<template>
  <div class="bg-gray-100">
    <navbar />
    <div class="flex row gap-x-2 mt-2">
      <div class="w-80 p-4 flex-none bg-white">
        <div class="pb-3">
          <button
            type="button"
            class="font-bold text-xl"
            v-if="this.catid > 0"
            @click="changeParams({ cat_id: '' })"
          >
            {{ CurrentCatName }}
          </button>
          <button v-else type="button" class="font-bold text-xl">
            Category
          </button>
          <button
            type="button"
            v-if="this.subcatid > 0"
            class="font-bold text-xl"
            @click="changeParams({ subcat_id: '' })"
          >
            &nbsp;/&nbsp;{{ CurrentSubCatName }}
          </button>

          <div v-if="this.catid > 0 || this.subcatid > 0" class="mt-2">
            <div
              v-for="subcategory in subcategories"
              :key="subcategory.subcatid"
            >
              <div v-if="subcategory.catid == this.catid">
                <button
                  type="button"
                  @click="changeParams({ subcat_id: subcategory.subcatid })"
                >
                  <span class="pl-4 font-lg">
                    {{ subcategory.subcatname }}</span
                  >
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div v-for="category in categories" :key="category.catid">
              <button
                type="button"
                @click="changeParams({ cat_id: category.catid })"
              >
                <span class="pl-4 font-lg">{{ category.catname }}</span>
              </button>
            </div>
          </div>
          <hr class="mt-4 border border-gray-200 w-full" />
        </div>

        <div class="flex flex-col">
          <div>
            <button
              type="button"
              class="w-full text-xl font-semibold text-left border-none accordion pb-2"
            >
              Sort By
            </button>
            <div class="ml-2">
              <input
                type="radio"
                value="price_h_l"
                @change="changeParams({ sort_by: 'price_h_l' })"
                v-model="this.sortby"
              />
              <label for="price_h_l_b"> Price (High to Low) </label>
              <br />
              <input
                type="radio"
                value="price_l_h"
                @change="changeParams({ sort_by: 'price_l_h' })"
                v-model="this.sortby"
              />
              <label for="price_l_h_b"> Price (High to Low)</label><br />
              <input
                type="radio"
                value="rating"
                @change="changeParams({ sort_by: 'rating' })"
                v-model="this.sortby"
              />
              <label for="rating_b"> Rating</label>
            </div>
            <hr class="mt-4 border border-gray-200 w-full" />
          </div>
          <div>
            <button
              type="button"
              class="w-full text-xl font-semibold text-left border-none accordion pb-2"
            >
              Price
            </button>
            <div class="panel">
              <div class="mt-6 mb-2" id="price_range"></div>
              <div class="flex flex-row w-full justify-between">
                <input
                  type="text"
                  id="min_limit"
                  :value="this.MinLimit"
                  class="text-black w-15 border-none focus:outline-none"
                  readonly
                />
                <input
                  type="text"
                  id="max_limit"
                  :value="this.MaxLimit"
                  class="text-black w-10 border-none focus:outline-none"
                  readonly
                />
              </div>
            </div>
            <hr class="mt-4 border border-gray-200 w-full" />
          </div>
        </div>
      </div>
      <div class="py-2 px-4 w-full bg-white">
        <p v-if="nullResults" class="text-4xl pl-2 pt-3 pb-2">
          No Results found
        </p>
        <p v-else class="text-4xl pl-2 pt-3 pb-2">
          Search
          <span v-if="subcatid > 0"> in {{ CurrentSubCatName }} </span>
          <span v-else-if="catid > 0"> in {{ CurrentCatName }} </span>
        </p>
        <hr class="border-gray-200 w-full" />

        <div class="grid grid-cols-4 gap-4 pt-2">
          <div
            v-for="product in productsList"
            :key="product.productid"
            class="w-full"
          >
            <router-link :to="`/product/${product.product_id}`">
              <img :src="product.product_main_image" />
              <div class="pt-5">
                <p class="text-md font-semibold block hover:text-blue-500">
                  {{ product.product_full_name }}
                </p>
                <span
                  v-for="n in Number(product.product_rating)"
                  class="fa fa-star text-blue-500"
                  :key="n"
                ></span>
                <span
                  v-for="n in Number(5 - product.product_rating)"
                  :key="n"
                  class="fa fa-star"
                ></span>
                <p class="text-xl">$ {{ product.product_price }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import * as noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

export default {
  name: "Search",
  data() {
    return {
      productsList: [],
      catid: 0,
      subcatid: 0,
      sortby: "",
      searchkeyword: "",
      categories: [],
      subcategories: [],
      nullResults: false,
      CurrentCatName: "",
      CurrentSubCatName: "",
      DefaultMaxLimit: 0,
      DefaultMinLimit: 0,
      MinLimit: 0,
      MaxLimit: 1,
      SliderHandle: null,
    };
  },
  components: { Navbar },
  props: {
    cat_id: {
      type: String,
      default: "",
    },
    subcat_id: {
      type: String,
      default: "",
    },
    search_keyword: {
      type: String,
      default: "",
    },
    sort_by: {
      type: String,
      default: "",
    },
    min_limit: {
      type: String,
      default: "",
    },
    max_limit: {
      type: String,
      default: "",
    },
  },
  async mounted() {
    this.categories = this.$cat_list.categories;
    this.subcategories = this.$cat_list.subcategories;
    await this.runSearch();
    this.createSlider();
    this.setupAccordion();
  },
  unmounted() {
    this.SliderHandle = null;
  },
  methods: {
    async runSearch() {
      // Doing the assignment here because i can update the data each time prpps are updated
      this.catid = this.cat_id ? this.cat_id : 0;
      this.subcatid = this.subcat_id && this.cat_id ? this.subcat_id : 0;
      this.searchkeyword = this.search_keyword ? this.search_keyword : "";
      this.sortby = this.sort_by ? this.sort_by : "";
      this.MinLimit = this.min_limit ? this.min_limit : 0;
      this.MaxLimit = this.max_limit ? this.max_limit : 0;
      const component = this;
      // Send a request to our API and receive json data containing all listings made by the seller
      await this.$axios({
        url: "http://localhost:80/sports_place/helpers/search.php",
        method: "get",
        params: {
          catid: component.catid,
          subcatid: component.subcatid,
          product_name: component.search_keyword,
          sortby: component.sortby,
          min_limit: component.min_limit,
          max_limit: component.max_limit,
        },
      })
        .then(function (response) {
          component.productsList = response.data.product_list;
          component.DefaultMaxLimit = Number(response.data.max_limit);
          if (
            component.MaxLimit > component.DefaultMaxLimit ||
            component.MaxLimit == 0
          )
            component.MaxLimit = component.DefaultMaxLimit;
          component.DefaultMinLimit = Number(response.data.min_limit);
          if (
            component.MinLimit < component.DefaultMinLimit ||
            component.MinLimit == 0
          )
            component.MinLimit = component.DefaultMinLimit;
          component.nullResults = false;
        })
        .catch(function (error) {
          if (
            error.response.statusText == "No results" ||
            error.response.statusText == "Must provide some criteria"
          ) {
            component.nullResults = true;
            component.productsList = null;
          }
        });
      if (this.subcatid > 0) {
        this.findCategoryName(this.subcatid, true);
      } else {
        this.CurrentSubCatName == "";
      }
      if (this.catid > 0) {
        this.findCategoryName(this.catid, false);
      } else {
        this.CurrentCatName == "";
      }
    },
    findCategoryName(catid, subcat = false) {
      if (subcat == false) {
        this.categories.forEach((element) => {
          if (Number(element.catid) == catid) {
            this.CurrentCatName = element.catname;
          }
        });
      } else {
        this.subcategories.forEach((element) => {
          if (Number(element.subcatid) == catid) {
            this.CurrentSubCatName = element.subcatname;
          }
        });
      }
    },
    // Used change the query
    // Only called to change the already existing query or add new one
    changeParams(obj) {
      // Clear the subcat id current query if we change or set it cat id to empty
      if (obj.cat_id || obj.cat_id == "") {
        this.$route.query.subcat_id = "";
      }
      this.$router.push({
        path: "/search",
        // Destuctring assignment operator to expand both objects
        query: { ...this.$route.query, ...obj },
      });
    },
    createSlider() {
      // Creating Price Slider
      var price_slider = document.getElementById("price_range");

      this.SliderHandle = noUiSlider.create(price_slider, {
        range: {
          min: this.DefaultMinLimit,
          max: this.DefaultMaxLimit,
        },
        connect: [false, true, false],
        step: 1,
        start: [this.MinLimit, this.MaxLimit],
      });
      price_slider.noUiSlider.on("set", this.updateLimits);
    },
    setupAccordion() {
      var acc = document.getElementsByClassName("accordion");
      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
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
    updateLimits(values) {
      document.getElementById("min_limit").value = values[0];
      document.getElementById("max_limit").value = values[1];
      this.changeParams({ min_limit: values[0], max_limit: values[1] });
    },
  },
  watch: {
    $route(to, from) {
      if (to.query !== from.query) {
        var comp = this;
        // Call the api with a bit of delay for the prop changes to reflect
        setTimeout(function () {
          comp.runSearch();
        }, 100);
      }
    },
  },
};
</script>

<style>
.accordion {
  transition: 0.4s;
}
.panel {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.1s ease-out;
}
.accordion:after {
  content: "\2b"; /* Unicode character for "plus" sign (+) */
  font-size: 36px;
  color: #777;
  float: right;
  margin-left: 5px;
}
.active:after {
  content: "\2796"; /* Unicode character for "minus" sign (-) */
  font-size: 12px;
}
.noUi-target {
  height: 10px;
  border-radius: 99999px;
}
.noUi-handle {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));
  width: 24px !important;
  height: 24px !important;
  top: -8px !important;
  border-radius: 9999px;
  --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.noUi-handle:after {
  display: none;
}
.noUi-handle:before {
  display: none;
}
.noUi-connect {
  --tw-bg-opacity: 1;
  background-color: rgba(37, 99, 235, var(--tw-bg-opacity));
}
.noUi-touch-area {
  display: none;
}
</style>
