<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>
        Filters
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>City</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="cityFilter"
            :options="cityOptions"
            class="w-100"
            :reduce="val => val.value"
            @input="(val) => $emit('update:cityFilter', val)"
          />
        </b-col>
        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Status</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="statusFilter"
            :options="statusOptions"
            class="w-100"
            :reduce="val => val.value"
            @input="(val) => $emit('update:statusFilter', val)"
          />
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
    methods: {
      onAddService(item) {
        const index = this.serviceIds.indexOf(item.id);
        if (index > -1) {
          this.serviceIds.splice(index, 1);
        } else {
          this.serviceIds.push(item.id);
        }
      },
      getMassageServices(services, elitesRequired) {
        const filteredServices = {
          ...services,
          services: services.services.filter(service => service.elites_required === elitesRequired),
        };
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
