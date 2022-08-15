<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          Ease
        </p>
        <span class="user-status">{{ userData.role }}</span>
      </div>
    </template>

    <b-dropdown-item
      :to="{ name: 'admin-elite-list'}"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="BriefcaseIcon"
        class="mr-50"
      />
      <span>Profesionisti</span>
    </b-dropdown-item>
    <b-dropdown-item
      :to="{ name: 'admin-client-list' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="UserIcon"
        class="mr-50"
      />
      <span>Clienti</span>
    </b-dropdown-item>
    <b-dropdown-item
      :to="{ name: 'admin-city-list' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="GlobeIcon"
        class="mr-50"
      />
      <span>Orase</span>
    </b-dropdown-item>
    <b-dropdown-item
      :to="{ name: 'admin-promo-code-list' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="GiftIcon"
        class="mr-50"
      />
      <span>Coduri Promo</span>
    </b-dropdown-item>

    <b-dropdown-divider />

    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="logout"
    >
      <feather-icon
        size="16"
        icon="LogOutIcon"
        class="mr-50"
      />
      <span>Logout</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
  /* eslint-disable */
  import { mapActions } from 'vuex';
  import {
    BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
  } from 'bootstrap-vue';
  import { initialAbility } from '@/libs/acl/config';
  import useJwt from '@/auth/jwt/useJwt';
  import { avatarText } from '@/core/utils/filter';

  export default {
    components: {
      BNavItemDropdown,
      BDropdownItem,
      BDropdownDivider,
      BAvatar,
    },
    data() {
      return {
        userData: {
          avatar: '/img/1.9cba4a79.png',
          company: 'Wayne Enterprises',
          contact: '(829) 537-0057',
          country: 'USA',
          currentPlan: 'team',
          email: 'irena.dubrovna@wayne.com',
          fullName: 'Selina Kyle',
          id: 21,
          role: 'admin',
          status: 'active',
          username: 'catwomen1940',
        },
        avatarText,
      };
    },
    methods: {
      ...mapActions({
        adminLogout: 'session/logout',
      }),
      logout() {
        this.adminLogout();

        // Reset ability
        // this.$ability.update(initialAbility);

        // Redirect to login page
        this.$router.push('/profesionisti');
      },
    },
  };
</script>
