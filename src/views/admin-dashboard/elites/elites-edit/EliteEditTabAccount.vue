<!-- eslint-disable -->
<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <div class="profile-pic-container">
          <figure>
            <img v-if="image" :src="image" alt="Profile Pic">
            <img v-else-if="getImageSource" :src="getImageSource" alt="Profile Pic">
            <img v-else src="@/assets/png/avatar-profesionist.png" alt="Profile Pic">
            <input
              id="profile-picture"
              ref="profile-picture"
              class="change-profile-picture"
              type="file"
              @change="handleFileUpload()"
            >
            <i class="icon_camera" @click.prevent="$refs['profile-picture'].click()" />
          </figure>
        </div>
      </template>
      <h4 class="mb-1">
        {{ userData.full_name }}
      </h4>
      <div class="d-flex flex-wrap">
        <b-button
          variant="primary"
          @click="$emit('on-save')"
        >
          <input
            ref="refInputEl"
            type="file"
            class="d-none"
            @input="inputImageRenderer"
          >
          <span class="d-none d-sm-inline">Save</span>
          <feather-icon
            icon="EditIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
          variant="outline-secondary"
          class="ml-1"
          @click="$router.push({ name: 'admin-elite-view', params: { id: userData.id } })"
        >
          <span class="d-none d-sm-inline">Back</span>
          <feather-icon
            icon="TrashIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
      </div>
    </b-media>

    <!-- User Info: Input Fields -->
    <b-form>
      <b-row>

        <!-- Field: Username -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Nume profil"
            label-for="display_name"
          >
            <b-form-input
              id="display_name"
              v-model="userData.display_name"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Limbi vorbite"
            label-for="languages"
          >
            <b-form-input
              id="languages"
              v-model="userData.languages"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Bio"
            label-for="bio"
          >
            <b-form-input
              id="bio"
              v-model="userData.bio"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Status -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Status"
            label-for="user-status"
          >
            <v-select
              v-model="userData.status"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="user-status"
            />
          </b-form-group>
        </b-col>

        <!-- Field: City -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="User City"
            label-for="user-city"
          >
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="userData.working_city_id"
            :options="cityOptions"
            class="w-100"
            :reduce="val => val.value"
            @input="(val) => $emit('on-update-working-city', val)"
          />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Certificari"
            label-for="certificates"
          >
            <b-form-input
              id="certificates"
              v-model="userData.certificates"
            />
          </b-form-group>
        </b-col>

      </b-row>
    </b-form>
  </div>
</template>

<script>
  /* eslint-disable */
  import {
    BButton, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm, BTable, BCard, BCardHeader, BCardTitle, BFormCheckbox,
  } from 'bootstrap-vue'
  import { avatarText } from '@/core/utils/filter'
  import vSelect from 'vue-select'
  import { useInputImageRenderer } from '@/core/comp-functions/forms/form-utils'
  import { ref } from '@vue/composition-api'
  import useUsersList from '../elites-list/useElitesList'

  export default {
    components: {
      BButton,
      BMedia,
      BAvatar,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BForm,
      BTable,
      BCard,
      BCardHeader,
      BCardTitle,
      BFormCheckbox,
      vSelect,
    },
    props: {
      userData: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      image: '',
      profilePicture: {},
    }),
    computed: {
      getImageSource() {
        return this.userData?.avatar?.url;
      },
    },
    watch: {
      profilePicture(newVal) {
        this.$emit('on-update-profile-picture', newVal);
      },
    },
    methods: {
      handleFileUpload() {
        this.profilePicture = this.$refs['profile-picture'].files[0];
        this.createImage(this.profilePicture);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();

        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },
    },
    setup(props) {
      const { resolveUserRoleVariant } = useUsersList()

      const cityOptions = [
        { label: 'Cluj Napoca', value: 1 },
        { label: 'Bucuresti', value: 2 },
      ]

      const statusOptions = [
        { label: 'Pending', value: 'pending' },
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Blocked', value: 'blocked' },
      ]

      // ? Demo Purpose => Update image on click of update
      const refInputEl = ref(null)
      const previewEl = ref(null)

      const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
        // eslint-disable-next-line no-param-reassign
        props.userData.avatar.url = base64
      })

      return {
        resolveUserRoleVariant,
        avatarText,
        cityOptions,
        statusOptions,

        //  ? Demo - Update Image on click of update button
        refInputEl,
        previewEl,
        inputImageRenderer,
      }
    },
  }
</script>

<style lang="scss">
@import '@/core/scss/vue/libs/vue-select.scss';
#profile-picture {
  position: absolute;
  visibility: hidden;
}
  .profile-pic-container {
    align-items: center;
    border-color: #ffffff;
    border-radius: 50%;
    border-style: solid;
    box-shadow: 0 0 8px 3px #b8b8b8;
    display: flex;
    height: 140px;
    justify-content: center;
    position: relative;
    width: 140px;
  }

  .profile-pic-container img,
  .profile-pic-container figure {
    border-radius: 50%;
    height: 140px;
    margin: 0;
    width: 140px;
  }

  .profile-pic-container i {
    align-items: center;
    background-color: white;
    border-radius: 50%;
    bottom: 20px;
    box-shadow: 0 0 8px 3px #b8b8b8;
    color: #d00078;
    display: flex !important;
    height: 30px;
    justify-content: center;
    position: absolute;
    right: -7px;
    width: 30px;
  }
</style>
