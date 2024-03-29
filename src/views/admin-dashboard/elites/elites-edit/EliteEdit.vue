<!-- eslint-disable -->
<template>
  <div>
    <component :is="getSelectedElite === undefined ? 'div' : 'b-card'">

      <!-- Alert: No item found -->
      <b-alert
        variant="danger"
        :show="getSelectedElite === undefined"
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

      <b-tabs
        v-if="getSelectedElite"
        pills
      >

        <!-- Tab: Account -->
        <b-tab active>
          <template #title>
            <feather-icon
              icon="UserIcon"
              size="16"
              class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">Account</span>
          </template>
          <user-edit-tab-account
            :user-data="elite"
            class="mt-2 pt-75"
            @on-save="onSave"
            @on-update-profile-picture="onUpdateProfilePicture"
            @on-update-working-city="onUpdateWorkingCity"
          />
        </b-tab>

        <!-- Tab: Information -->
        <b-tab>
          <template #title>
            <feather-icon
              icon="InfoIcon"
              size="16"
              class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">Information</span>
          </template>
          <user-edit-tab-information class="mt-2 pt-75" :user-data="getSelectedElite" @on-save="onSave" />
        </b-tab>

        <!-- Tab: Social -->
        <b-tab>
          <template #title>
            <feather-icon
              icon="FileIcon"
              size="16"
              class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">Date facturare</span>
          </template>
          <user-edit-tab-social class="mt-2 pt-75" :user-data="getSelectedElite" @on-save="onSave" />
        </b-tab>
      </b-tabs>
    </component>

    <b-row>
      <b-col
        cols="6"
        lg="6"
      >
        <es-elite-services
          :user-data="getSelectedElite"
          @on-update-elite="onUpdateElite"
        />
      </b-col>
      <b-col
        cols="6"
        lg="6"
      >
        <es-elite-documents
          :user-data="getSelectedElite"
          @on-update-elite="onUpdateElite"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
  /* eslint-disable */
  import { mapActions, mapGetters } from 'vuex';
  import {
    BTab, BRow, BCol, BTabs, BCard, BAlert, BLink, BButton,
  } from 'bootstrap-vue';
  import { ref, onUnmounted } from '@vue/composition-api';
  import router from '@/router';
  import store from '@/store';
  import { isEqual } from 'lodash-es';
  import { getUtcToZonedTime } from '@/utils/date-helpers';
  import EliteServices from '../elites-view/EliteServices';
  import EliteDocuments from '../elites-view/EliteDocuments';
  import userStoreModule from '../eliteStoreModule';
  import UserEditTabAccount from './EliteEditTabAccount.vue';
  import UserEditTabInformation from './EliteEditTabInformation.vue';
  import UserEditTabSocial from './EliteEditTabSocial.vue';

  export default {
    components: {
      BButton,
      BCol,
      BRow,
      BTab,
      BTabs,
      BCard,
      BAlert,
      BLink,
      UserEditTabAccount,
      UserEditTabInformation,
      UserEditTabSocial,
      'es-elite-services': EliteServices,
      'es-elite-documents': EliteDocuments,
    },

    data: () => ({
      avatar: '',
      elite: {
        full_name: '',
        first_name: '',
        last_name: '',
        email: '',
        expected_salary: '',
        bio: '',
        languages: '',
        started_working_at: '',
        gender: '',
        heard_from: '',
        working_city_id: '',
      },
    }),

    computed: {
      ...mapGetters({
        getSelectedElite: 'admin/getSelectedElite',
      }),
    },

    async created() {
      const eliteId = this.$router.currentRoute.params.id;
      await this.fetchElites(eliteId);
      this.elite = { ...this.elite, ...this.getSelectedElite };
    },

    watch: {
      getSelectedElite: {
        handler(newVal) {
          this.elite = { ...this.elite, ...newVal };
        },
        deep: true,
      },
    },

    methods: {
      ...mapActions({
        fetchElites: 'admin/fetchElite',
        updateElite: 'admin/updateElite',
        updateProfilePicture: 'admin/updateProfilePicture',
      }),

      onUpdateWorkingCity(id) {
        this.elite = { ...this.elite, working_city_id: parseInt(id, 10) };
      },

      onUpdateElite(elite) {
        this.elite = { ...this.elite, ...elite };
      },

      async onSavePicture() {
        let formData = new FormData();
        formData.append('avatar', this.avatar, this.avatar.name);
        this.updateProfilePicture(formData);
      },

      onUpdateProfilePicture(avatar) {
        this.avatar = avatar;
      },

      async onSave() {
        const newElite = { ...this.elite };

        Object.keys(newElite).forEach((key) => {
          if (key.includes('confirmed')) {
            if (typeof newElite[key] !== 'boolean') {
              newElite[key] = newElite[key] === 'accepted' ? true : false;
            }
          }
        });

        newElite.started_working_at = getUtcToZonedTime(newElite.started_working_at).toDateString();

        this.$toasts.toast({
          id: 'update-toast',
          title: this.$t('toast.success_title'),
          message: this.$t('toast.account_update'),
          intent: 'success',
        });

        if (this.avatar) {
          await this.onSavePicture();
        }

        await this.updateElite({ elite: newElite });
        const eliteId = this.$router.currentRoute.params.id;
        await this.fetchElites(eliteId);
      },
    },
  }
</script>

<style>

</style>
