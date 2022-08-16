<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>
        Filters
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <!-- Search -->
        <b-col
          cols="12"
          md="3"
          class="mb-md-0 mb-2"
        >
          <label>Search Type</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="searchType"
            :options="searchOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="Select a search type ..."
            @input="(val) => $emit('update:searchType', val)"
          />
        </b-col>
        <b-col
          cols="12"
          md="3"
        >
          <label>Search Value</label>
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="getSearchValue"
              class="d-inline-block mr-1"
              placeholder="Search..."
              @keydown.enter="onSearch"
            />
            <b-button
              variant="primary"
              :disabled="!searchType"
              @click="onSearch"
            >
              <span class="text-nowrap">Search</span>
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
  /* eslint-disable */
  import {
    BCard,
    BCardHeader,
    BCardBody,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BPagination,
    BDropdownDivider,
    BDropdownForm,
    BDropdownGroup,
    BFormInput,
    BButton,
  } from 'bootstrap-vue'
  import vSelect from 'vue-select';
  import Ripple from 'vue-ripple-directive';

  export default {
    components: {
      BRow,
      BCol,
      BCard,
      BCardHeader,
      BCardBody,
      vSelect,
      BDropdown,
      BDropdownItem,
      BPagination,
      BDropdownDivider,
      BDropdownForm,
      BDropdownGroup,
      BFormInput,
      BButton,
    },
    props: {
      searchType: {
        type: [String, null],
        default: null,
      },
      searchOptions: {
        type: Array,
        required: true,
      },
    },
    directives: {
      Ripple,
    },
    data: () => ({
      searchQuery: '',
    }),
    computed: {
      servicesList() {
        const filteredServices = this.services
          .filter(({ category }) => category !== 'promotions')
          .map(item => ({
            ...item,
            id: item.category,
          }));
        return filteredServices;
      },
      getSearchValue: {
        get() {
          return this.searchQuery;
        },
        set(value) {
          this.searchQuery = value;
        },
      },
    },
    methods: {
      onSearch() {
        this.$emit('on-search', this.searchQuery);
      },
    },
  }
</script>

<style lang="scss">
@import '@/core/scss/vue/libs/vue-select.scss';
  .dropdown-menu {
    height: 500px;
    overflow: hidden;
    overflow-y: scroll;
  }
</style>
