<!-- eslint-disable -->
<template>

  <!-- Table Container Card -->
  <b-card
    no-body
  >

    <div class="m-2">

      <!-- Table Top -->
      <b-row>

        <!-- Per Page -->
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <h4>Servicii</h4>
        </b-col>
      </b-row>

    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="reservations"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
    >

      <!-- Column: Id -->
      <template #cell(id)="data">
        #{{ data.value }}
      </template>

      <!-- Column: Client -->
      <template #cell(client)="data">
        <b-media vertical-align="center">
          <span class="font-weight-bold d-block text-nowrap">
            {{ data.item.client_id }}
          </span>
        </b-media>
      </template>

      <!-- Column: Balance -->
      <template #cell(review)="data">
        <span class="font-weight-bold d-block text-nowrap">
         {{ data.item.review || '-' }}
        </span>
      </template>

      <!-- Column: Actions -->
      <template #cell(actions)="data">

        <div class="text-nowrap" @click="onRefund(data.item.id)">
          <feather-icon
            :id="`review-row-${data.item.id}-refund-icon`"
            icon="RefreshCwIcon"
            size="16"
            class="align-middle text-body"
          />
          <b-tooltip
            title="Refund"
            class="cursor-pointer"
            :target="`review-row-${data.item.id}-refund-icon`"
          />
        </div>

        <div class="text-nowrap" @click="onCancel(data.item.id)">
          <feather-icon
            :id="`review-row-${data.item.id}-cancel-icon`"
            icon="SlashIcon"
            size="16"
            class="align-middle text-body"
          />
          <b-tooltip
            title="Cancel"
            class="cursor-pointer"
            :target="`review-row-${data.item.id}-cancel-icon`"
          />
        </div>
      </template>

    </b-table>
    <div class="mx-2 mb-2">
      <b-row>

        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.to }} entries</span>
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >

          <b-pagination
            v-model="currentPage"
            :total-rows="totalInvoices"
            :per-page="perPage"
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

</template>

<script>
  /* eslint-disable */
  import { mapActions } from 'vuex';
  import {
    BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
    BBadge, BDropdown, BDropdownItem, BPagination, BTooltip,
  } from 'bootstrap-vue'
  import { avatarText } from '@/core/utils/filter'
  import vSelect from 'vue-select'
  import { onUnmounted } from '@vue/composition-api'
  import { store } from '@/store'
  import reviewsList from './reviewsList'

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
      BTooltip,

      vSelect,
    },
    props: {
      reservations: Array,
    },
    setup() {
      const statusOptions = [
        'Downloaded',
        'Draft',
        'Paid',
        'Partial Payment',
        'Past Due',
      ]

      const {
        tableColumns,
        perPage,
        currentPage,
        totalInvoices,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refInvoiceListTable,

        statusFilter,

        refetchData,

        resolveInvoiceStatusVariantAndIcon,
        resolveClientAvatarVariant,
      } = reviewsList();

      return {
        tableColumns,
        perPage,
        currentPage,
        totalInvoices,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refInvoiceListTable,

        statusFilter,

        refetchData,

        statusOptions,

        avatarText,
        resolveInvoiceStatusVariantAndIcon,
        resolveClientAvatarVariant,
      }
    },
    methods: {
      ...mapActions({
        removeEliteReview: 'admin/removeEliteReview',
      }),
      onCancel(id) {
        // const eliteId = this.$router.currentRoute.params.id;
        // this.removeEliteReview({ eliteId, reviewId: id  });
      },
      onRefund(id) {
        // const eliteId = this.$router.currentRoute.params.id;
        // this.removeEliteReview({ eliteId, reviewId: id  });
      },
    },
  }
</script>

<style lang="scss" scoped>
  .per-page-selector {
    width: 90px;
  }

  .invoice-filter-select {
    min-width: 190px;

    ::v-deep .vs__selected-options {
      flex-wrap: nowrap;
    }

    ::v-deep .vs__selected {
      width: 100px;
    }
  }
</style>

<style lang="scss">
  @import '@/core/scss/vue/libs/vue-select.scss';
</style>