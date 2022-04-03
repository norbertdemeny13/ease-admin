<!-- eslint-disable -->
<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="getSelectedCity === undefined"
    >
      <h4 class="alert-heading">
        Error fetching user data
      </h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-users-list'}"
        >
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <template v-if="getSelectedCity">
      <b-row>
        <b-col
          cols="12"
          lg="12"
        >
          <es-city-services
            :services="getSelectedCity"
          />
        </b-col>
      </b-row>
    </template>

  </div>
</template>

<script>
  /* eslint-disable */
  import { mapActions, mapGetters } from 'vuex';
  import { store } from '@/store';
  import { router } from '@/router';
  import { ref, onUnmounted } from '@vue/composition-api';
  import {
    BRow, BCol, BAlert, BLink,
    BCard,
    BCardBody,
    BButton,
  } from 'bootstrap-vue';
  import CityServices from './CityServices';
  import userStoreModule from '../cityStoreModule';

  export default {
    components: {
      BButton,
      BRow,
      BCol,
      BAlert,
      BLink,
      BCard,
      BCardBody,

      // Local Components
      'es-city-services': CityServices,
    },

    computed: {
      ...mapGetters({
        getSelectedCity: 'admin/getSelectedCity',
      }),
    },

    created() {
      const cityId = this.$router.currentRoute.params.id;
      this.fetchCity(cityId);
    },

    methods: {
      ...mapActions({
        fetchCity: 'admin/fetchCity',
      }),
    },
  }
</script>

<style>

</style>
