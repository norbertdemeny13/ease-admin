<!-- eslint-disable -->
<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="getSelectedClient === undefined"
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

    <template v-if="getSelectedClient">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
          xl="9"
          lg="8"
          md="7"
        >
          <user-view-user-info-card :user-data="getSelectedClient" />
        </b-col>
        <b-col
          cols="12"
          md="5"
          xl="3"
          lg="4"
        >
          <user-view-user-plan-card :user-data="getSelectedClient" />
        </b-col>
      </b-row>

      <es-reservations :reservations="getSelectedClient.reservations" :user-id="getSelectedClient.id" />
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
  } from 'bootstrap-vue';
  import Reservations from './Reservations';
  import UserViewUserInfoCard from './ClientViewUserInfoCard.vue';
  import UserViewUserPlanCard from './ClientViewUserPlanCard.vue';
  import UserViewUserTimelineCard from './ClientViewUserTimelineCard.vue';
  import UserViewUserPermissionsCard from './ClientViewUserPermissionsCard.vue';

  export default {
    components: {
      BRow,
      BCol,
      BAlert,
      BLink,
      'es-reservations': Reservations,
      UserViewUserInfoCard,
      UserViewUserPlanCard,
      UserViewUserTimelineCard,
      UserViewUserPermissionsCard,
    },

    computed: {
      ...mapGetters({
        getSelectedClient: 'admin/getSelectedClient',
      }),
    },

    created() {
      const userId = this.$router.currentRoute.params.id;
      this.fetchUser(userId);
    },

    methods: {
      ...mapActions({
        fetchUser: 'admin/fetchUser',
      }),
    },
  }
</script>

<style>

</style>
