<template>
  <div>
    <promo-code-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewCodeModalOpen"
    />
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col
            cols="12"
            md="4"
            class="mb-md-0 mb-2 d-flex align-items-end"
          >
            <div class="d-flex flex-wrap">
              <b-button
                variant="primary"
                @click="isAddNewCodeModalOpen = true"
              >
                Adauga cod promo
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >
      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="getPromoCodes"
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
              <b-avatar
                size="32"
                :src="data.item.image.url"
              />
            </template>
            {{ data.item.code }}
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
    BCardBody,
    BCardHeader,
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
  import AddNewCode from './AddNewCode.vue';
  import usePromoCodeList from './usePromoCodeList';

  export default {
    components: {
      BCard,
      BCardBody,
      BCardHeader,
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
      'promo-code-add-new': AddNewCode,

      vSelect,
    },

    data: () => ({
      isAddNewCodeModalOpen: false,
      dataMeta: {
        items: 10,
        page: 1,
      },
      refund: {
        amount: '',
        reason: '',
      },
    }),

    created() {
      this.fetchPromoCodes();
    },
    computed: {
      ...mapGetters({
        getPromoCodes: 'admin/getPromoCodes',
      }),
      clients() {
        const clients = this.getClients.items || [];
        const meta = this.getClients.pagy;
        return clients.map(elite => ({ ...elite, working_city_name: this.$t(elite.working_city_name), }));
      },
    },

    methods: {
      ...mapActions({
        fetchPromoCodes: 'admin/fetchPromoCodes',
      }),
      getInitials(item) {
        const firstNameI = item.full_name?.split(' ').map(n => n[0]).join('');
        return `${firstNameI}`;
      },
      onAdd() {},
      onModalHide() {},
    },
    setup() {
      const isAddNewUserSidebarActive = ref(false)

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
      } = usePromoCodeList()

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
