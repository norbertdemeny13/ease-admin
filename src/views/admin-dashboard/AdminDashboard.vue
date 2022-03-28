<!-- eslint-disable -->
<template>
  <div
    id="admin-app"
    class="admin-dashboard-container h-100"
    :class="[skinClasses]"
  >
    <component v-if="isAdmin" :is="layout">
      <router-view />
    </component>
    <div v-else class="bg_gray content">
      <div class="auth-wrapper auth-v1 px-2">
        <div class="auth-inner py-2">

          <!-- Login v1 -->
          <b-card class="mb-0">
            <b-link class="brand-logo">
              <img
                src="@/assets/svg/ease-logo_pink.svg"
                width="162"
                height="45"
                alt="Ease Logo"
              >
            </b-link>

            <b-card-title class="mb-1">
              Welcome to Admin Dashboard! 👋
            </b-card-title>
            <b-card-text class="mb-2">
              Please sign-in to your account and start the adventure
            </b-card-text>

            <!-- form -->
            <validation-observer
              ref="loginForm"
              #default="{invalid}"
            >
              <b-form
                class="auth-login-form mt-2"
                @submit.prevent
              >

                <!-- email -->
                <b-form-group
                  label-for="email"
                  label="Email"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Email"
                    rules="required|email"
                  >
                    <b-form-input
                      id="email"
                      v-model="form.email"
                      name="login-email"
                      :state="errors.length > 0 ? false:null"
                      placeholder="john@example.com"
                      autofocus
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- password -->
                <b-form-group>
                  <validation-provider
                    #default="{ errors }"
                    name="Password"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid':null"
                    >
                      <b-form-input
                        id="password"
                        v-model="form.password"
                        :type="passwordFieldType"
                        class="form-control-merge"
                        :state="errors.length > 0 ? false:null"
                        name="login-password"
                        placeholder="Password"
                      />

                      <b-input-group-append is-text>
                        <feather-icon
                          class="cursor-pointer"
                          :icon="passwordToggleIcon"
                          @click="togglePasswordVisibility"
                        />
                      </b-input-group-append>
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- submit button -->
                <b-button
                  variant="primary"
                  type="submit"
                  block
                  :disabled="invalid"
                  @click="onLogin"
                >
                  Sign in
                </b-button>
              </b-form>
            </validation-observer>

          </b-card>
          <!-- /Login v1 -->
        </div>
      </div>
    </div>
    <scroll-to-top v-if="enableScrollToTop" />
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapActions, mapGetters } from 'vuex';
  import { isEqual } from 'lodash-es';
  import ScrollToTop from '@/core/components/scroll-to-top/ScrollToTop.vue';

  /* eslint-disable global-require */
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import {
    BButton, BForm, BFormInput, BFormGroup, BCard, BLink, BCardTitle, BCardText, BInputGroup, BInputGroupAppend, BFormCheckbox,
  } from 'bootstrap-vue';

  import { required, email } from '@/core/utils/validations/validations.js';
  import { togglePasswordVisibility } from '@/core/mixins/ui/forms';

  // This will be populated in `beforeCreate` hook
  import { $themeColors, $themeBreakpoints, $themeConfig } from '@/utils/theme-config';
  import { watch } from '@vue/composition-api';
  import useAppConfig from '@/core/app-config/useAppConfig';

  import { useWindowSize, useCssVar } from '@vueuse/core';

  import { store } from '@/store';
  import LayoutVertical from '@/layouts/vertical/LayoutVertical.vue';
  // const LayoutVertical = () => import('@/layouts/vertical/LayoutVertical.vue');
  const LayoutHorizontal = () => import('@/layouts/horizontal/LayoutHorizontal.vue');
  const LayoutFull = () => import('@/layouts/full/LayoutFull.vue');

  export default Vue.extend({
    name: 'es-admin-dashboard',
    components: {
      BButton,
      BForm,
      BFormInput,
      BFormGroup,
      BCard,
      BCardTitle,
      BLink,
      BCardText,
      BInputGroup,
      BInputGroupAppend,
      BFormCheckbox,
      ValidationProvider,
      ValidationObserver,

      // Layouts
      LayoutHorizontal,
      LayoutVertical,
      LayoutFull,

      ScrollToTop,
    },

    mixins: [togglePasswordVisibility],

    data: () => ({
      sideImg: require('@/assets/svg/login-v2.svg'),
      userType: 'admin',
      showPassword: false,
      passwordType: 'password',
      form: {
        email: 'admin@ease.ro',
        password: 'Supersecretpassword1!',
      },
    }),

    // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
    // Currently, router.currentRoute is not reactive and doesn't trigger any change
    computed: {
      ...mapGetters({
        getUser: 'session/getUser',
      }),
      passwordToggleIcon() {
        return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
      },
      imgUrl() {
        if (store.state.appConfig.layout.skin === 'dark') {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.sideImg = require('@/assets/svg/login-v2-dark.svg')
          return this.sideImg
        }
        return this.sideImg
      },
      isAdmin() {
        return this.getUser?.email === 'admin@ease.ro' && this.getUser?.name === 'Admin';
      },
      layout() {
        if (this.$route.meta.layout === 'full') return 'layout-full';
        return `layout-${this.contentLayoutType}`;
      },
      contentLayoutType() {
        return this.$store.state.appConfig.layout.type;
      },
    },
    beforeCreate() {
      // Set colors in theme
      const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'];

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = colors.length; i < len; i++) {
        $themeColors[colors[i]] = useCssVar(`--${colors[i]}`, document.documentElement).value.trim();
      }

      // Set Theme Breakpoints
      const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];

      // eslint-disable-next-line no-plusplus
      for (let i = 0, len = breakpoints.length; i < len; i++) {
        $themeBreakpoints[breakpoints[i]] = Number(useCssVar(`--breakpoint-${breakpoints[i]}`, document.documentElement).value.slice(0, -2));
      }

      // Set RTL
      const { isRTL } = $themeConfig.layout;
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    },
    setup() {
      const { skin, skinClasses } = useAppConfig();
      const { enableScrollToTop } = $themeConfig.layout;

      // If skin is dark when initialized => Add class to body
      if (skin.value === 'dark') document.body.classList.add('dark-layout');

      // Set Window Width in store
      store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth);
      const { width: windowWidth } = useWindowSize();
      watch(windowWidth, (val) => {
        store.commit('app/UPDATE_WINDOW_WIDTH', val);
      });

      return {
        skinClasses,
        enableScrollToTop,
      };
    },

    watch: {
      getUser(newVal, oldVal) {
        const isDifferent = !isEqual(newVal, oldVal);
        if (isDifferent && newVal?.email && newVal?.name) {
          this.$router.push('/profesionisti').catch(()=>{});;
        }
      },
    },

    methods: {
      ...mapActions({
        login: 'session/login',
      }),
      onLogin() {
        this.login({ credentials: this.form, });
      },
    },
  });
</script>

<style lang="scss">
@import '@/core/scss/vue/pages/page-auth.scss';
</style>
