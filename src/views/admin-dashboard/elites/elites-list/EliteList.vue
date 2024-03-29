<template>
  <div>
    <user-list-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :city-options="cityOptions"
      :service-options="serviceOptions"
      @refetch-data="refetchData"
    />

    <!-- Filters -->
    <users-list-filters
      :city-filter.sync="dataMeta.city_id"
      :service-filter.sync="dataMeta.service"
      :status-filter.sync="dataMeta.status"
      :city-options="cityOptions"
      :service-options="serviceOptions"
      :status-options="statusOptions"
      :services="getServices"
      :service-ids="serviceIds"
      :search-type.sync="searchType"
      :search-options="searchOptions"
      @on-search="onSearch"
    />

    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >
      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="elites"
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
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.avatar.url"
                :text="avatarText(data.item.fullName)"
                :variant="`light-${resolveUserRoleVariant(data.item.role)}`"
                :to="{ name: 'admin-elite-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'admin-elite-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.full_name }}
            </b-link>
            <small class="text-muted">#{{ data.item.id || '-' }}</small>
          </b-media>
        </template>

        <!-- Column: Status -->
        <template #cell(status)="data">
          <b-badge
            pill
            :variant="`light-${resolveUserStatusVariant(data.item.status)}`"
            class="text-capitalize"
          >
            {{ data.item.status }}
          </b-badge>
        </template>

        <!-- Column: Pending Documents -->
        <template #cell(pending_services)="data">
          <feather-icon
            icon="CircleIcon"
            size="16"
            :class="`align-middle text-body ${data.item.pending_services ? 'pending' : 'accepted'}`"
          />
        </template>

        <!-- Column: Pending Documents -->
        <template #cell(pending_documents)="data">
          <feather-icon
            icon="CircleIcon"
            size="16"
            :class="`align-middle text-body ${data.item.pending_documents ? 'pending' : 'accepted'}`"
          />
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item :to="{ name: 'admin-elite-view', params: { id: data.item.id } }">
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item :to="{ name: 'admin-elite-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.count }} entries</span>
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
  import UsersListFilters from './ElitesListFilters.vue';
  import useUsersList from './useElitesList';
  import userStoreModule from '../eliteStoreModule';
  import UserListAddNew from './EliteListAddNew.vue';

  export default {
    components: {
      UsersListFilters,
      UserListAddNew,

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
        searchQuery: '',
      },
      searchType: null,
      serviceIds: [],
    }),

    created() {
      this.fetchElites(this.dataMeta);
      this.fetchServices();
    },
    computed: {
      ...mapGetters({
        getElites: 'admin/getElites',
        getServices: 'services/getServices',
      }),
      elites() {
        const elites = this.getElites.items || [];
        const meta = this.getElites.pagy;
        return elites.map(elite => ({ ...elite, working_city_name: this.$t(elite.working_city_name), }));
      },
      newDataModel() {
        return Object.assign({}, this.dataMeta);
      },
      newServiceId() {
        return [...this.serviceIds];
      },
    },
    watch: {
      getElites(newVal) {
        if (newVal.pagy) {
          this.setMeta(newVal.pagy);
        }
      },
      newDataModel: {
        handler(newVal, oldVal) {
          if (!isEqual(newVal, oldVal)) {
            this.refetchData();
          }
        },
        deep: true,
        immediate: false,
      },
      newServiceId(newVal, oldVal) {
        if (newVal.length !== oldVal.length) {
          this.refetchData();
        }
      },
      sortBy(newVal, oldVal) {
        if(newVal !== oldVal) {
          this.refetchData();
        }
      },
      isSortDirDesc(newVal, oldVal) {
        if(this.dataMeta.page !== 1) {
          this.dataMeta.page = 1;
        }

        if(newVal !== oldVal) {
          this.refetchData();
        }
      },
    },
    methods: {
      ...mapActions({
        fetchElites: 'admin/fetchElites',
        fetchServices: 'services/fetchServices',
      }),
      onSearch(data) {
        this.dataMeta.searchQuery = data;
        this.fetchElites({ ...this.dataMeta, [this.searchType]: data });
      },
      setMeta(meta) {
        this.dataMeta = { 
          ...this.dataMeta,
          items: meta.items,
          page: meta.pages,
          count: meta.count,
          items: meta.items,
          from: meta.from,
          to: meta.to,
          page: meta.page,
        };
      },
      async refetchData() {
        const {
          dataMeta,
          serviceIds,
          searchType,
          sortBy,
          isSortDirDesc
        } = this;
        let newData = { ...dataMeta, serviceIds };

        if (searchType) {
          newData = { ...newData, [searchType]: dataMeta.searchQuery };
        }

        if (sortBy) {
          newData = { ...newData, order: isSortDirDesc ? 'desc' : 'asc', field: sortBy };
        }

        await this.fetchElites(newData);
      },
    },
    setup() {
      const USER_APP_STORE_MODULE_NAME = 'app-user'

      // Register module
      if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

      // UnRegister on leave
      onUnmounted(() => {
        if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
      })

      const isAddNewUserSidebarActive = ref(false)

      const cityOptions = [
        { label: 'Cluj Napoca', value: '1' },
        { label: 'Bucuresti', value: '2' },
      ]

      const serviceOptions = [
        { label: 'Basic', value: 'basic' },
        { label: 'Company', value: 'company' },
        { label: 'Enterprise', value: 'enterprise' },
        { label: 'Team', value: 'team' },
      ]

      const statusOptions = [
        { label: 'Pending', value: 'pending' },
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Blocked', value: 'blocked' },
      ]

      const searchOptions = [
        { label: 'Name', value: 'name' },
        { label: 'Elite Id', value: 'elite_id' },
        { label: 'Phone Number', value: 'phone_number' },
        { label: 'Email', value: 'email' },
      ]

      const {
        fetchUsers,
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

        // Sidebar
        isAddNewUserSidebarActive,

        fetchUsers,
        tableColumns,
        perPage,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refUserListTable,

        // Filter
        avatarText,

        // UI
        resolveUserRoleVariant,
        resolveUserRoleIcon,
        resolveUserStatusVariant,

        cityOptions,
        serviceOptions,
        statusOptions,
        searchOptions,

        // Extra Filters
        cityFilter,
        serviceFilter,
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
