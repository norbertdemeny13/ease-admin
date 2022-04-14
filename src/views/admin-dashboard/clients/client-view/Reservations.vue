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
      <template #cell(status)="data">
        <b-media vertical-align="center">
          <b-badge
            pill
            :variant="`light-${resolveUserStatusVariant(data.item.status)}`"
            class="text-capitalize"
          >
            <span v-if="data.item.status === 'reservation_cancelled_by_user'" class="font-weight-bold d-block text-nowrap">
              Anulata de user
            </span>
            <span v-else-if="data.item.status === 'reservation_cancelled_by_elite'" class="font-weight-bold d-block text-nowrap">
              Anulata de pro
            </span>
            <span v-else-if="data.item.status === 'auto_cancelled'" class="font-weight-bold d-block text-nowrap">
              Anulata automat
            </span>
            <span v-else-if="data.item.status === 'cancelled'" class="font-weight-bold d-block text-nowrap">
              Anulata
            </span>
            <span v-else class="font-weight-bold d-block text-nowrap">
              {{ data.item.status }}
            </span>
          </b-badge>
        </b-media>
      </template>

      <!-- Column: Actions -->
      <template #cell(actions)="data">

        <div v-if="canRefund(data.item.status)" class="text-nowrap" v-b-modal.modal-refund @click="selectedRow = data.item.reservation_service_id">
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

        <div v-if="canCancel(data.item.status)" class="text-nowrap" @click="onCancel(data.item.reservation_service_id)">
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
    <!-- modal refund-->
    <b-modal
      id="modal-refund"
      cancel-variant="outline-secondary"
      ok-title="Restituie"
      cancel-title="Inchide"
      centered
      title="Restituire serviciu"
      @hide="onModalHide"
      @ok="onRefund"
    >
      <b-form>
        <b-form-group>
          <label for="refund">Suma restituire</label>
          <b-form-input
            id="refund"
            v-model="refund.amount"
            placeholder="Introdu suma care urmeaza sa fie restituita"
          />
        </b-form-group>
        <b-form-group>
          <label for="refund-reason">Motiv restituire</label>
          <v-select
            :value="refund.reason"
            :options="refundOptions"
            class="w-100"
            :reduce="val => val.value"
            @input="(val) => refund.reason = val"
          />
        </b-form-group>
      </b-form>
    </b-modal>
  </b-card>
</template>

<script>
  /* eslint-disable */
  import { mapActions } from 'vuex';
  import {
    BCard, BRow, BCol, BFormInput, BFormTextarea, BButton, BTable, BMedia, BModal, BAvatar, BLink,
    BBadge, BDropdown, BDropdownItem, BPagination, BTooltip,
    BForm, BFormGroup,
  } from 'bootstrap-vue'
  import vSelect from 'vue-select'
  import { onUnmounted } from '@vue/composition-api'
  import { store } from '@/store'
  import reviewsList from './reviewsList'

  export default {
    components: {
      BCard,
      BRow,
      BCol,
      BFormInput, BFormTextarea,
      BButton,
      BTable,
      BMedia,
      BModal,
      BAvatar,
      BLink,
      BBadge,
      BDropdown,
      BDropdownItem,
      BPagination,
      BTooltip,
      BForm,
      BFormGroup,
      vSelect,
    },
    props: {
      reservations: Array,
      userId: [String, Number],
    },
    data: () => ({
      refund: {
        amount: '',
        reason: '',
      },
      selectedRow: '',
    }),
    setup() {
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
      }
    },
    computed: {
      refundOptions() {
        const refundOptions = [
          { label: 'Duplicat', value: 'duplicate' },
          { label: 'Fraudulos', value: 'fraudulent' },
          { label: 'Solicitat de client', value: 'requested_by_customer' },
        ];

        return refundOptions;
      },
    },
    methods: {
      ...mapActions({
        removeEliteReview: 'admin/removeEliteReview',
        onClientRefund: 'admin/onClientRefund',
        onReservationCancel: 'admin/onReservationCancel',
      }),

      resolveUserStatusVariant(status) {
        if (status === 'incomplete') return 'warning';
        if (status === 'payment_ongoing') return 'warning';
        if (status === 'waiting_confirmation') return 'warning';
        if (status === 'on_the_way') return 'warning';
        if (status === 'completed') return 'success';
        if (status === 'reservation_cancelled_by_user') return 'secondary';
        if (status === 'reservation_cancelled_by_elite') return 'secondary';
        if (status === 'auto_cancelled') return 'secondary';
        return 'primary';
      },

      canRefund(status) {
        const acceptedStatuses = [
          'confirmed',
          'on_the_way',
          'arrived',
          'completed',
          'reservation_cancelled_by_user',
          'reservation_cancelled_by_elite',
          'reservation_cancelled_by_admin',
          'admin_refunded',
        ];
        return acceptedStatuses.includes(status);
      },

      canCancel(status) {
        const acceptedStatuses = [
          'incomplete',
          'payment_ongoing',
          'waiting_confirmation',
          'confirmed',
          'on_the_way',
          'arrived',
        ];
        return acceptedStatuses.includes(status);
      },

      onCancel(id) {
        this.$bvModal
          .msgBoxConfirm('Are you sure you want to cancel the reservation?', {
            cancelVariant: 'outline-secondary',
          })
          .then(value => {
            this.onReservationCancel({
              serviceId: id,
              clientId: this.userId,
            });
          })
      },
      onModalHide() {
        this.refund = {
          amount: '',
          reason: '',
        };
      },
      async onRefund() {
        const { refund, selectedRow } = this;
        await this.onClientRefund({
          refund,
          serviceId: selectedRow,
          clientId: this.userId,
        });
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

  .modal-footer {
    background: transparent;
  }
</style>
