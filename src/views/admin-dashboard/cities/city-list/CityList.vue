<template>
  <div>
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >
      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="cities"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >
        <!-- Column: User -->
        <template #cell(id)="data">
          <b-media vertical-align="center">
            <b-link
              :to="{ name: 'admin-city-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              #{{ data.item.id || '-' }}
            </b-link>
          </b-media>
        </template>

        <template #cell(name)="data">
          <b-media vertical-align="center">
            <b-link
              :to="{ name: 'admin-city-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ $t(data.item.name) || '-' }}
            </b-link>
          </b-media>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ cities.length }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-pagination
              v-model="dataMeta.page"
              :total-rows="dataMeta.count"
              :per-page="dataMeta.items"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
  /* eslint-disable */
  import { mapActions, mapGetters } from 'vuex';
  import {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BDropdownDivider,
    BDropdownForm,
    BDropdownGroup,
  } from 'bootstrap-vue';
  import vSelect from 'vue-select';
  import { store } from '@/store';
  import { isEqual } from 'lodash-es';
  import { ref, onUnmounted } from '@vue/composition-api';
  import { avatarText } from '@/core/utils/filter';
  import useUsersList from './useCityList';
  import userStoreModule from '../cityStoreModule';

  export default {
    components: {
      BCard,
      BRow,
      BCol,
      BFormInput,
      BButton,
      BTable,
      BMedia,
      BAvatar,
      BLink,
      BBadge,
      BDropdown,
      BDropdownItem,
      BPagination,

      vSelect,
    },

    data: () => ({
      dataMeta: {
        items: 10,
        page: 1,
        city_id: null,
        status: null,
        service: null,
      },
      serviceIds: [],
    }),

    created() {
      this.fetchCities(this.dataMeta);
    },
    computed: {
      ...mapGetters({
        getCities: 'admin/getCities',
      }),
      cities() {
        const cities = this.getCities || [];
        return cities;
      },
    },
    methods: {
      ...mapActions({
        fetchCities: 'admin/fetchCities',
      }),
    },
    setup() {
      const {
        tableColumns,
        perPage,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refUserListTable,

        // UI
        resolveUserRoleVariant,
        resolveUserRoleIcon,
        resolveUserStatusVariant,

        // Extra Filters
        cityFilter,
        serviceFilter,
      } = useUsersList()

      return {
        tableColumns,
        perPage,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refUserListTable,

        // UI
        resolveUserRoleVariant,
        resolveUserRoleIcon,
        resolveUserStatusVariant,
      }
    },
  }
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.pending {
  background-color: #ff9f43 !important;
  color: #ff9f43 !important;
  border-radius: 50%;
}

.accepted {
  background-color: #28c76f !important;
  color: #28c76f !important;
  border-radius: 50%;
}
</style>

<style lang="scss">
@import '@/core/scss/vue/libs/vue-select.scss';
</style>
