<!-- eslint-disable -->
<template>
  <b-form>
    <b-row class="mt-1">

      <!-- Field: Nume Companie -->
      <b-col
        cols="12"
        md="6"
        lg="4"
      >
        <b-form-group
          label="Nume Companie"
          label-for="company"
        >
          <b-form-input
            id="company"
            v-model="userData.company_name"
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
          label="CIF"
          label-for="cif_number"
        >
          <b-form-input
            id="cif_number"
            v-model="userData.cif_number"
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
          label="Nr. Inregistrare"
          label-for="registration_number"
        >
          <b-form-input
            id="registration_number"
            v-model="userData.registration_number"
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
</template>

<script>
  /* eslint-disable */
  import {
    BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BInputGroup, BInputGroupPrepend,
  } from 'bootstrap-vue'

  export default {
    components: {
      BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BInputGroup, BInputGroupPrepend,
    },
    props: {
      userData: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style>

</style>
