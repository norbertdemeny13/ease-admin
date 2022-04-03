<!-- eslint-disable -->
<template>
  <div>

    <!-- Header: Personal Info -->
    <div class="d-flex">
      <feather-icon
        icon="UserIcon"
        size="19"
      />
      <h4 class="mb-0 ml-50">
        Personal Information
      </h4>
    </div>

    <!-- Form: Personal Info Form -->
    <b-form class="mt-1">
      <b-row>

        <!-- Field: Birth Date -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Inceput profesie"
            label-for="datepicker-default"
          >
            <es-datepicker
              :options="{
                maxDate: 'today',
              }"
            >
              <input
                id="datepicker-default"
                v-model="started_working_at"
                class="datepicker-input"
                name="datepicker-default"
                type="text"
                size="md"
                placeholder="Alege o data"
              >
            </es-datepicker>
          </b-form-group>
        </b-col>

        <!-- Field: Mobile -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Telefon"
            label-for="phone_number"
          >
            <b-form-input
              id="phone_number"
              v-model="userData.phone_number"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Website -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Website"
            label-for="website"
          >
            <b-form-input
              id="website"
              v-model="userData.website"
            />
          </b-form-group>
        </b-col>

      </b-row>

      <!-- Header: Personal Info -->
      <div class="d-flex mt-2">
        <feather-icon
          icon="MapPinIcon"
          size="19"
        />
        <h4 class="mb-0 ml-50">
          Address
        </h4>
      </div>

      <!-- Form: Personal Info Form -->
      <b-row class="mt-1">

        <!-- Field: Address Line 1 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Address Line 1"
            label-for="address-line-1"
          >
            <b-form-input
              id="address-line-1"
              v-model="userData.address"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Address Line 2 -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Cod Postal"
            label-for="postal_code"
          >
            <b-form-input
              id="postal_code"
              v-model="userData.postal_code"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Postcode -->
        <b-col
          cols="12"
          md="6"
          lg="4"
        >
          <b-form-group
            label="Oras"
            label-for="city"
          >
            <b-form-input
              id="city"
              v-model="userData.city"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mt-2">
        <b-col>
          <b-button
            variant="primary"
            class="mb-1 mb-sm-0 mr-0 mr-sm-1"
            :block="$store.getters['app/currentBreakPoint'] === 'xs'"
            @click="$emit('on-save')"
          >
            Save Changes
          </b-button>
          <b-button
            variant="outline-secondary"
            :block="$store.getters['app/currentBreakPoint'] === 'xs'"
            @click="$router.push({ name: 'admin-elite-view', params: { id: userData.id } })"
          >
            Back
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
  /* eslint-disable */
  import {
    BRow, BCol, BForm, BFormGroup, BFormInput, BFormRadioGroup, BFormCheckboxGroup, BButton,
  } from 'bootstrap-vue'
  import { Datepicker } from '@/components/shared/datepicker';
  import { ref } from '@vue/composition-api'
  import vSelect from 'vue-select'

  export default {
    components: {
      BRow, BCol, BForm, BFormGroup, BFormInput, vSelect, BFormRadioGroup, BFormCheckboxGroup, BButton,
      'es-datepicker': Datepicker,
    },
    props: {
      userData: {
        type: Object,
        required: true,
      },
    },

    data: () => ({
      started_working_at: '',
    }),

    created() {
      this.started_working_at = this.userData.started_working_at;
    },

    watch: {
      started_working_at(newVal) {
        this.userData.started_working_at = newVal;
      },
    },
  }
</script>

<style lang="scss">

</style>
