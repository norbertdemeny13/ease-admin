<template>
  <b-card :title="$t('views.pro_dashboard.documents')">
    <div class="d-flex mt-2">
      <es-custom-checkbox :checked="userData.interview_done" class="mr-2" />
      <div class="d-flex justify-content-between w-100">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('generic.interview_confirmed') }}</h3>
        </div>
        <div class="d-flex">
          <div v-if="!disabled" class="media d-flex flex-column">
            <b-form-checkbox
              v-model="userData.interview_done"
              class="custom-control-success"
              switch
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex mt-2">
      <es-custom-checkbox :checked="userData.avatar_confirmed" class="mr-2" />
      <div class="d-flex justify-content-between w-100">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.avatar') }}</h3>
          <div v-if="userData.avatar" class="documents-container">
            <p class="info text-secondary"><a :href="userData.avatar.url" target="_blank" download>{{ userData.avatar.url }}</a></p>
          </div>
        </div>
        <div class="d-flex">
          <div v-if="!disabled" class="media d-flex flex-column">
            <b-form-checkbox
              v-model="isAvatarConfirmed"
              class="custom-control-success"
              switch
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex mt-2">
      <es-custom-checkbox :checked="userData.certificate_of_calification_confirmed" class="mr-2" />
      <div class="d-flex justify-content-between w-100">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.qualification_certificate') }}</h3>
          <div v-if="userData.certificate_of_calification && userData.certificate_of_calification.length" class="documents-container">
            <p v-for="(file, i) in userData.certificate_of_calification" :key="file.id" class="info text-secondary"><a :href="file.url" target="_blank" download>{{ file.filename }}</a><span class="delete-btn ml-4" @click="onRemove('certificate_of_calification', i)" /></p>
          </div>
        </div>
        <div class="d-flex">
          <div v-if="!disabled" class="media d-flex flex-column">
            <b-form-checkbox
              v-model="isCertificateOfCalificationConfirmed"
              class="custom-control-success"
              switch
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex mt-2">
      <es-custom-checkbox :checked="userData.id_card_confirmed" class="mr-2" />
      <div class="d-flex justify-content-between w-100">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.identity_card') }}</h3>
          <div v-if="userData.id_card && userData.id_card.length" class="documents-container">
            <p v-for="(file, i) in userData.id_card" :key="file.id" class="info text-secondary"><a :href="file.url" target="_blank" download>{{ file.filename }}</a><span class="delete-btn ml-4" @click="onRemove('id_card', i)" /></p>
          </div>
        </div>
        <div class="d-flex">
          <div v-if="!disabled" class="media d-flex flex-column">
            <b-form-checkbox
              v-model="isIdCardConfirmed"
              class="custom-control-success"
              switch
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex mt-2">
      <es-custom-checkbox :checked="userData.certificate_of_registration_confirmed" class="mr-2" />
      <div class="d-flex justify-content-between w-100">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.register_certificate') }}</h3>
          <div v-if="userData.certificate_of_registration && userData.certificate_of_registration.length" class="documents-container">
            <p v-for="(file, i) in userData.certificate_of_registration" :key="file.id" class="info text-secondary"><a :href="file.url" target="_blank" download>{{ file.filename }}</a><span class="delete-btn ml-4" @click="onRemove('certificate_of_registration', i)" /></p>
          </div>
        </div>
        <div class="d-flex">
          <div v-if="!disabled" class="media d-flex flex-column">
            <b-form-checkbox
              v-model="isCertificateOfRegistrationConfirmed"
              class="custom-control-success"
              switch
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex mt-2">
      <es-custom-checkbox :checked="userData.practice_insurance_confirmed" class="mr-2" />
      <div class="d-flex justify-content-between w-100">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.professional_liability_insurance') }}</h3>
          <div v-if="userData.practice_insurance && userData.practice_insurance.length" class="documents-container">
            <p v-for="(file, i) in userData.practice_insurance" :key="file.id" class="info text-secondary"><a :href="file.url" target="_blank" download>{{ file.filename }}</a><span class="delete-btn ml-4" @click="onRemove('practice_insurance', i)" /></p>
          </div>
        </div>
        <div class="d-flex">
          <div v-if="!disabled" class="media d-flex flex-column">
            <b-form-checkbox
              v-model="isPracticeInsuranceConfirmed"
              class="custom-control-success"
              switch
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex mt-2">
      <es-custom-checkbox :checked="userData.criminal_record_confirmed" class="mr-2" />
      <div class="d-flex justify-content-between w-100">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.criminal_record_certificate') }}</h3>
          <div v-if="userData.criminal_record && userData.criminal_record.length" class="documents-container">
            <p v-for="(file, i) in userData.criminal_record" :key="file.id" class="info text-secondary"><a :href="file.url" target="_blank" download>{{ file.filename }}</a><span class="delete-btn ml-4" @click="onRemove('criminal_record', i)" /></p>
          </div>
        </div>
        <div class="d-flex">
          <div v-if="!disabled" class="media d-flex flex-column">
            <b-form-checkbox
              v-model="isCriminalRecordConfirmed"
              class="custom-control-success"
              switch
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex mt-2">
      <es-custom-checkbox :checked="userData.equipment_photos_confirmed" class="mr-2" />
      <div class="d-flex justify-content-between w-100">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.equipment_photos') }}</h3>
          <div v-if="userData.equipment_photos && userData.equipment_photos.length" class="documents-container">
            <p v-for="(file, i) in userData.equipment_photos" :key="file.id" class="info text-secondary"><a :href="file.url" target="_blank" download>{{ file.filename }}</a><span class="delete-btn ml-4" @click="onRemove('equipment_photos', i)" /></p>
          </div>
        </div>
        <div class="d-flex">
          <div v-if="!disabled" class="media d-flex flex-column">
            <b-form-checkbox
              v-model=" isEquipmentPhotosConfirmed"
              class="custom-control-success"
              switch
            />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex mt-2">
      <es-custom-checkbox :checked="userData.accord_accepted" class="mr-2" />
      <div class="d-flex justify-content-between w-100">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.accept_terms_and_conditions') }}</h3>
        </div>
      </div>
    </div>
    <div class="d-flex mt-2">
      <es-custom-checkbox :checked="userData.stripe_account_created" class="mr-2" />
      <div class="d-flex justify-content-between w-100">
        <div class="document-type d-flex flex-column">
          <h3>{{ $t('views.pro_dashboard.bank_account') }}</h3>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { BCard, BRow, BCol, BFormCheckbox, } from 'bootstrap-vue';
  import { isEqual } from 'lodash-es';
  import { CustomCheckbox } from '@/components/shared/custom-checkbox';
  import { Divider } from '@/components/shared/divider';
  import { CalendlyModal } from '@/components/shared/calendly-modal';

  export default Vue.extend({
    name: 'es-pro-documents',

    components: {
      BCard,
      BCol,
      BRow,
      BFormCheckbox,
      'es-custom-checkbox': CustomCheckbox,
      'es-divider': Divider,
      'es-calendly-modal': CalendlyModal,
    },

    props: {
      userData: {
        type: Object,
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      isCalendlyModalOpen: false,
      isTermsAndConditionsModalOpen: false,
      user: {
        accord_accepted: false,
      },
    }),

    computed: {
      isInterviewPossible() {
        const {
          certificate_of_calification_confirmed,
          id_card_confirmed,
        } = this.userData;
        return certificate_of_calification_confirmed === 'accepted' && id_card_confirmed === 'accepted';
      },
      isCertificateOfCalificationConfirmed: {
        get() {
          return this.userData.certificate_of_calification_confirmed === 'accepted';
        },
        set(newVal) {
          this.user.certificate_of_calification_confirmed = newVal;
        },
      },
      isIdCardConfirmed: {
        get() {
          return this.userData.id_card_confirmed === 'accepted';
        },
        set(newVal) {
          this.user.id_card_confirmed = newVal;
        },
      },
      isCertificateOfRegistrationConfirmed: {
        get() {
          return this.userData.certificate_of_registration_confirmed === 'accepted';
        },
        set(newVal) {
          this.user.certificate_of_registration_confirmed = newVal;
        },
      },
      isPracticeInsuranceConfirmed: {
        get() {
          return this.userData.practice_insurance_confirmed === 'accepted';
        },
        set(newVal) {
          this.user.practice_insurance_confirmed = newVal;
        },
      },
      isCriminalRecordConfirmed: {
        get() {
          return this.userData.criminal_record_confirmed === 'accepted';
        },
        set(newVal) {
          this.user.criminal_record_confirmed = newVal;
        },
      },
      isAvatarConfirmed: {
        get() {
          return this.userData.avatar_confirmed === 'accepted';
        },
        set(newVal) {
          this.user.avatar_confirmed = newVal;
        },
      },
      isEquipmentPhotosConfirmed: {
        get() {
          return this.userData.equipment_photos_confirmed === 'accepted';
        },
        set(newVal) {
          this.user.equipment_photos_confirmed = newVal;
        },
      },
    },

    created() {
      this.user = { ...this.userData };
    },

    watch: {
      userData(newVal) {
        this.user = { ...newVal };
      },
      user: {
        handler(newVal) {
          this.$emit('on-update-elite', newVal);
        },
        deep: true,
      },
    },

    methods: {
      ...mapActions({
        uploadDocuments: 'elite/uploadDocuments',
        updateElite: 'session/updateElite',
      }),
      onRemove(type, index) {
        const newArray = this.$data.documents[type].splice(index, 1);
      },
    },
  });
</script>

<style lang="scss">
  .documents-input {
    position: absolute !important;
    visibility: hidden;
  }

  .documents-button {
    width: 225px;
    white-space: nowrap;
  }

  .logo {
    height: 19px;
  }
</style>
