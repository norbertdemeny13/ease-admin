<template>
  <b-card
    no-body
    class="border-primary"
  >
    <b-card-header class="d-flex justify-content-between align-items-center pt-75 pb-25">
      <h4 class="mb-0">
        {{ userData.company_name || '-' }}
      </h4>
    </b-card-header>

    <b-card-body>
      <b-col
        cols="12"
        xl="12"
      >
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">CIF</span>
            </th>
            <td class="pb-50">
              {{ userData.cif_number || '-' }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Registration Nr.</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.registration_number || '-' }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Hear From</span>
            </th>
            <td class="pb-50">
              {{ userData.heard_from || '-' }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <span class="font-weight-bold">Expected Salary</span>
            </th>
            <td class="pb-50">
              {{ userData.expected_salary || '-' }}
            </td>
          </tr>
        </table>
      </b-col>
    </b-card-body>
  </b-card>
</template>

<script>
  /* eslint-disable */
  import {
    BCard, BCardHeader, BCardBody, BCol, BBadge, BButton,
  } from 'bootstrap-vue'
  import Ripple from 'vue-ripple-directive'

  export default {
    props: {
      userData: {
        type: Object,
        required: true,
      },
    },
    directives: {
      Ripple,
    },
    components: {
      BCard,
      BCardHeader,
      BCardBody,
      BCol,
      BBadge,
      BButton,
    },
  }
</script>

<style>

</style>
