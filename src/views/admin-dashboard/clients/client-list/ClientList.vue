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
    />

    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >
      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="clients"
        responsive
        :fields="tableColumns"
        primary-key="id"
        :sort-by.sync="sortBy"
        show-empty
        empty-text="No matching records found"
        :sort-desc.sync="isSortDirDesc"
      >

        <!-- Column: User -->
        <template #cell(user)="data">
          <b-media vertical-align="center">
            <template #aside>
              <figure>
                <div class="item-header">
                  <div class="item-logo">{{ getInitials(data.item) }}</div>
                </div>
              </figure>
            </template>
            <b-link
              :to="{ name: 'admin-client-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.full_name }}
            </b-link>
            <small class="text-muted">#{{ data.item.email }}</small>
          </b-media>
        </template>

        <!-- Column: Created At -->
        <template #cell(total_spent)="data">
          {{ data.item.total_spent ? `${data.item.total_spent} Lei` : '0' }}
        </template>

        <!-- Column: Created At -->
        <template #cell(created_at)="data">
          {{ data.item.created_at ? data.item.created_at.substr(0, 10) : '-' }}
        </template>

        <!-- Column: Last Reservation -->
        <template #cell(last_reservation_date)="data">
          {{ data.item.last_reservation_date ? data.item.last_reservation_date.substr(0, 10) : '-' }}
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
  import UsersListFilters from './ClientListFilters.vue';
  import useUsersList from './useClientsList';
  import UserListAddNew from './ClientListAddNew.vue';

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
      },
    }),

    created() {
      this.fetchClients(this.dataMeta);
    },
    computed: {
      ...mapGetters({
        getClients: 'admin/getClients',
      }),
      clients() {
        const clients = this.getClients.items || [];
        const meta = this.getClients.pagy;
        return clients.map(elite => ({ ...elite, working_city_name: this.$t(elite.working_city_name), }));
      },
      newDataModel() {
        return Object.assign({}, this.dataMeta);
      },
    },
    watch: {
      getClients(newVal) {
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
    },
    methods: {
      ...mapActions({
        fetchClients: 'admin/fetchClients',
      }),
      getInitials(item) {
        const firstNameI = item.full_name?.split(' ').map(n => n[0]).join('');
        return `${firstNameI}`;
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
      refetchData() {
        const { dataMeta } = this;
        this.fetchClients({ ...dataMeta });
      },
    },
    setup() {
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

.item-header {
  display: flex;
}

.item-logo {
  background-color: rgba(115, 103, 240, 0.12);
  color: #7367f0;
  border-radius: 50%;
  color: #000000;
  display: flex;
  font-size: 14px;
  height: 35px;
  justify-content: center;
  width: 35px;
  line-height: 34px;
}

span {
  font-size: 1rem;
}
</style>

<style lang="scss">
@import '@/core/scss/vue/libs/vue-select.scss';
</style>
