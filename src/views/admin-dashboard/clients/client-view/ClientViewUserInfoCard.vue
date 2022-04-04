<template>
  <b-card>

    <b-row>

      <!-- User Info: Left col -->
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <figure>
            <div class="item-header">
              <div class="item-logo"><span>{{ getInitials(userData) }}</span></div>
            </div>
          </figure>
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ userData.full_name }}
              </h4>
              <span class="card-text">{{ userData.email }}</span>
            </div>
            <div class="d-flex flex-wrap">
              <b-button
                variant="primary"
                v-b-modal.modal-credit
              >
                Add credit
              </b-button>
            </div>
          </div>
        </div>

        <!-- User Stats -->
        <div class="d-flex align-items-center mt-2">
          <div class="d-flex align-items-center mr-2">
            <b-avatar
              variant="light-primary"
              rounded
            >
              <feather-icon
                icon="DollarSignIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                {{ userData.total_spent }}
              </h5>
              <small>Total Cheltuit</small>
            </div>
          </div>

          <div class="d-flex align-items-center">
            <b-avatar
              variant="light-success"
              rounded
            >
              <feather-icon
                icon="TrendingUpIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                {{ userData.reservations_count }}
              </h5>
              <small>Rezervari</small>
            </div>
          </div>
        </div>
      </b-col>

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="6"
      >
        <table class="mt-2 mt-xl-0 w-60">
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="UserIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Id</span>
            </th>
            <td class="pb-50">
              {{ userData.id }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="StarIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">City</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ $t(userData.default_address.city.name) }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="PhoneIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Phone</span>
            </th>
            <td class="pb-50">
              {{ userData.phone_number }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="DollarSignIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Ease Credit</span>
            </th>
            <td class="pb-50">
              {{ userData.ease_credit }}
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>

    <!-- modal credit-->
    <b-modal
      id="modal-credit"
      cancel-variant="outline-secondary"
      ok-title="Adauga"
      cancel-title="Inchide"
      centered
      title="Restituire serviciu"
      @hide="credit = ''"
      @ok="onAdd"
    >
      <b-form>
        <b-form-group>
          <label for="refund">Credit</label>
          <b-form-input
            id="refund"
            v-model="credit"
            placeholder="Introdu suma care urmeaza sa o adaugi"
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
    BCard, BButton, BAvatar, BRow, BCol,
    BModal, BForm, BFormInput, BFormGroup,
  } from 'bootstrap-vue'
  import { avatarText } from '@/core/utils/filter'
  import useUsersList from '../client-list/useClientsList'

  export default {
    components: {
      BCard, BButton, BRow, BCol, BAvatar,
      BModal, BForm, BFormInput, BFormGroup,
    },
    props: {
      userData: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      credit: '',
    }),
    computed: {
      getImageSource() {
        return this.userData?.avatar?.url;
      },
    },
    methods: {
      ...mapActions({
        onAddCredit: 'admin/onAddCredit',
      }),
      getInitials(item) {
        const firstNameI = item.full_name?.split(' ').map(n => n[0]).join('');
        return `${firstNameI}`;
      },
      onAdd() {
        const { credit } = this;
        this.onAddCredit({ credit, clientId: this.userData.id });
      },
    },
    setup() {
      const { resolveUserRoleVariant } = useUsersList()
      return {
        avatarText,
        resolveUserRoleVariant,
      }
    },
  }
</script>

<style>
  .item-header {
    display: flex;
  }

  .item-logo {
    align-items: center;
    background-color: rgba(115, 103, 240, 0.12);
    color: #7367f0;
    border-radius: 50%;
    color: #000000;
    display: flex;
    font-size: 30px;
    height: 104px;
    justify-content: center;
    width: 104px;
    line-height: 34px;
  }
</style>
