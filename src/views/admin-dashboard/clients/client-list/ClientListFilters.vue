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
          md="6"
        >
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input
              v-model="searchQuery"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
            <b-button
              variant="primary"
              @click="isAddNewUserSidebarActive = true"
            >
              <span class="text-nowrap">Add User</span>
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
      serviceFilter: {
        type: [String, null],
        default: null,
      },
      cityFilter: {
        type: [String, null],
        default: null,
      },
      statusFilter: {
        type: [String, null],
        default: null,
      },
      cityOptions: {
        type: Array,
        required: true,
      },
      serviceOptions: {
        type: Array,
        required: true,
      },
      statusOptions: {
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
