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
          md="2"
          class="mb-md-0 mb-2"
        >
          <label>City</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="cityFilter"
            :options="cityOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="Select a city ..."
            @input="(val) => $emit('update:cityFilter', val)"
          />
        </b-col>
        <b-col
          cols="12"
          md="2"
          class="mb-md-0 mb-2"
        >
          <label>Status</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="statusFilter"
            :options="statusOptions"
            class="w-100"
            :reduce="val => val.value"
            placeholder="Select a status ..."
            @input="(val) => $emit('update:statusFilter', val)"
          />
        </b-col>
        <b-col
          cols="12"
          md="2"
          class="mb-md-0 mb-2 d-flex align-items-end"
        >
          <!-- group -->
          <b-dropdown
            id="dropdown-grouped"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="outline-primary"
            left
            text="Services"
          >
            <b-dropdown-group
              v-for="service in servicesList"
              :id="`dropdown-group-${service.id}`"
              :key="service.id"
              :header="$t(service.title)"
            >
              <b-dropdown-group
                v-for="item in service.items"
                :id="`dropdown-group-${item.id}`"
                :key="item.id"
                :header="$t(item.title)"
              >
                <template v-if="item.name === 'couple'">
                  <header>{{ $t('generic.message_couple_t1') }}</header>
                  <b-dropdown-item v-for="serviceItem in getMassageServices(item, 1).services" :key="serviceItem.id">
                    <div class="checkboxes">
                      <label class="container_check" @click.prevent="onAddService(serviceItem)">
                        {{ $t(serviceItem.name) }}
                        {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                        {{ `${service.category === 'massage' ? 'min' : ''}` }}
                        <input type="checkbox" :checked="serviceIds.includes(serviceItem.id) ? 'checked' : ''">
                        <span class="checkmark" />
                      </label>
                    </div>
                  </b-dropdown-item>
                  <header>{{ $t('generic.message_couple_t2') }}</header>
                  <b-dropdown-item v-for="serviceItem in getMassageServices(item, 2).services" :key="serviceItem.id">
                    <div class="checkboxes">
                      <label class="container_check" @click.prevent="onAddService(serviceItem)">
                        {{ $t(serviceItem.name) }}
                        {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                        {{ `${service.category === 'massage' ? 'min' : ''}` }}
                        <input type="checkbox" :checked="serviceIds.includes(serviceItem.id) ? 'checked' : ''">
                        <span class="checkmark" />
                      </label>
                    </div>
                  </b-dropdown-item>
                </template>
                <b-dropdown-item v-for="serviceItem in item.services" v-else :key="serviceItem.id">
                  <div class="checkboxes">
                    <label class="container_check" @click.prevent="onAddService(serviceItem)">
                      {{ $t(serviceItem.name) }}
                      {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                      {{ `${service.category === 'massage' ? 'min' : ''}` }}
                      <input type="checkbox" :checked="serviceIds.includes(serviceItem.id) ? 'checked' : ''">
                      <span class="checkmark" />
                    </label>
                  </div>
                </b-dropdown-item>
              </b-dropdown-group>
            </b-dropdown-group>
          </b-dropdown>
        </b-col>
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
    BButton,
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
  } from 'bootstrap-vue'
  import vSelect from 'vue-select';
  import Ripple from 'vue-ripple-directive';

  export default {
    components: {
      BRow,
      BButton,
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
      searchType: {
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
      services: {
        required: true,
        type: Array,
      },
      serviceIds: {
        required: true,
        type: Array,
      },
      searchOptions: {
        type: Array,
        required: true,
      },
    },
    directives: {
      Ripple,
    },
    data:() => ({
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
