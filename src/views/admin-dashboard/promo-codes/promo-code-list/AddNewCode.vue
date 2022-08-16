<!-- eslint-disable -->
<template>
  <b-sidebar
    id="add-new-user-sidebar"
    :visible="isAddNewUserSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-user-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Adauga Cod Promo
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- BODY -->
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit"
          @reset.prevent="resetForm"
        >

          <!-- Code Name -->
            <b-form-group
              label="Denumire Cod"
              label-for="code"
            >
              <b-form-input
                id="code"
                v-model="userData.code"
                autofocus
                trim
                placeholder="EVO10"
              />

            </b-form-group>

          <!-- Valid From -->
            <b-form-group
              label="Valabil de la"
              label-for="valid-from"
            >
              <es-datepicker>
                <input
                  id="valid-from"
                  v-model="userData.valid_from"
                  class="datepicker-input"
                  name="valid-from"
                  type="text"
                  size="md"
                  placeholder="Alege o data"
                >
              </es-datepicker>

            </b-form-group>

          <!-- Valid Until -->
            <b-form-group
              label="Valabil pana"
              label-for="valid-until"
            >
              <es-datepicker>
                <input
                  id="valid-until"
                  v-model="userData.valid_until"
                  class="datepicker-input"
                  name="valid-until"
                  type="text"
                  size="md"
                  placeholder="Alege o data"
                >
              </es-datepicker>

            </b-form-group>

          <!-- Selected Services -->
            <b-form-group
              label="Servicii"
              label-for="dropdown-grouped"
            >
              <b-dropdown
                id="dropdown-grouped"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="outline-primary"
                left
                text="Services"
              >
                <b-dropdown-group
                  v-for="service in servicesList"
                  :id="`dropdown-group-${service.id}`"
                  :key="service.id"
                  :header="$t(service.title)"
                >
                  <b-dropdown-group
                    v-for="item in service.items"
                    :id="`dropdown-group-${item.id}`"
                    :key="item.id"
                    :header="$t(item.title)"
                  >
                    <template v-if="item.name === 'couple'">
                      <header>{{ $t('generic.message_couple_t1') }}</header>
                      <b-dropdown-item  v-for="serviceItem in getMassageServices(item, 1).services" :key="serviceItem.id">
                        <div class="checkboxes">
                          <label class="container_check" @click.prevent="onAddService(serviceItem)">
                            {{ $t(serviceItem.name) }}
                            {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                            {{ `${service.category === 'massage' ? 'min' : ''}` }}
                            <input type="checkbox" :checked="userData.service_ids.includes(serviceItem.id) ? 'checked' : ''">
                            <span class="checkmark" />
                          </label>
                        </div>
                      </b-dropdown-item>
                      <header>{{ $t('generic.message_couple_t2') }}</header>
                      <b-dropdown-item  v-for="serviceItem in getMassageServices(item, 2).services" :key="serviceItem.id">
                        <div class="checkboxes">
                          <label class="container_check" @click.prevent="onAddService(serviceItem)">
                            {{ $t(serviceItem.name) }}
                            {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                            {{ `${service.category === 'massage' ? 'min' : ''}` }}
                            <input type="checkbox" :checked="userData.service_ids.includes(serviceItem.id) ? 'checked' : ''">
                            <span class="checkmark" />
                          </label>
                        </div>
                      </b-dropdown-item>
                    </template>
                    <b-dropdown-item v-else v-for="serviceItem in item.services" :key="serviceItem.id">
                      <div class="checkboxes">
                        <label class="container_check" @click.prevent="onAddService(serviceItem)">
                          {{ $t(serviceItem.name) }}
                          {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                          {{ `${service.category === 'massage' ? 'min' : ''}` }}
                          <input type="checkbox" :checked="userData.service_ids.includes(serviceItem.id) ? 'checked' : ''">
                          <span class="checkmark" />
                        </label>
                      </div>
                    </b-dropdown-item>
                 </b-dropdown-group>
               </b-dropdown-group>
              </b-dropdown>
            </b-form-group>

          <!-- First Timers Only -->
            <b-form-group
              label="Valid doar la prima rezervare"
              label-for="first-time-only"
            >
              <b-form-checkbox
                v-model="userData.first_timers_only"
                class="custom-control-success"
                id="first-time-only"
                name="first-time-only"
                switch
              />

            </b-form-group>

          <!-- Uses Left -->
            <b-form-group
              label="Utilizari ramase"
              label-for="uses-left"
            >
              <b-form-input
                id="uses-left"
                v-model="userData.uses_left"
                trim
              />

            </b-form-group>

          <!-- Minimum Order Value -->
            <b-form-group
              label="Comanda minima"
              label-for="minimum-order"
            >
              <b-form-input
                id="minimum-order"
                v-model="userData.minimum_order_value"
                trim
              />

            </b-form-group>

          <!-- Direct discount -->
            <b-form-group
              label="Discount fix"
              label-for="direct-discount"
            >
              <b-form-input
                id="direct-discount"
                v-model="userData.direct_discount"
                trim
              />

            </b-form-group>

          <!-- Percentage discount -->
            <b-form-group
              label="Discount procentual"
              label-for="procentual-discount"
            >
              <b-form-input
                id="procentual-discount"
                v-model="userData.percentage_discount"
                trim
              />

            </b-form-group>

          <!-- Link to service -->
            <b-form-group
              label="Link spre serviciu"
              label-for="link-to-service"
            >
              <b-form-input
                id="link-to-service"
                v-model="userData.link_to_service"
                trim
              />

            </b-form-group>

          <!-- Visible -->
            <b-form-group
              label="Vizibil in aplicatie"
              label-for="visible"
            >
              <b-form-checkbox
                v-model="userData.visible"
                class="custom-control-success"
                id="visible"
                name="visible"
                switch
              />

            </b-form-group>

          <b-form-group
            label="Poza cod promo"
          >
            <div class="promo-code-container">
              <figure>
                <img v-if="image" :src="image" alt="Promo Code">
                <div v-else class="image-placeholder"></div>
                <input
                  id="promo-code"
                  ref="promo-code"
                  class="change-promo-code"
                  type="file"
                  @change="handleFileUpload()"
                >
                <i class="icon_camera" @click.prevent="$refs['promo-code'].click()" />
              </figure>
            </div>
          </b-form-group>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Add
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancel
            </b-button>
          </div>

        </b-form>
    </template>
  </b-sidebar>
</template>

<script>
  /* eslint-disable */
  import { mapActions, mapGetters } from 'vuex';
  import {
    BSidebar, BForm, BFormGroup, BFormInput, BFormInvalidFeedback, BButton, BFormCheckbox,
    BDropdown,
    BDropdownItem,
    BPagination,
    BDropdownDivider,
    BDropdownForm,
    BDropdownGroup,
  } from 'bootstrap-vue';
  import { nanoid } from 'nanoid';
  import { ref } from '@vue/composition-api';
  import { Datepicker } from '@/components/shared/datepicker';
  import formValidation from '@/core/comp-functions/forms/form-validation'
  import Ripple from 'vue-ripple-directive'
  import vSelect from 'vue-select'
  import { store } from '@/store'

  export default {
    components: {
      BSidebar,
      BForm,
      BFormCheckbox,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BButton,
      BDropdown,
      BDropdownItem,
      BPagination,
      BDropdownDivider,
      BDropdownForm,
      BDropdownGroup,
      vSelect,
      'es-datepicker': Datepicker,
    },
    directives: {
      Ripple,
    },
    model: {
      prop: 'isAddNewUserSidebarActive',
      event: 'update:is-add-new-user-sidebar-active',
    },
    props: {
      isAddNewUserSidebarActive: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        image: '',
        promo_code: {},
      }
    },
    created() {
      this.fetchServices();
    },
    computed: {
      ...mapGetters({
        getServices: 'services/getServices',
        getPromoCodeStatus: 'admin/getPromoCodeStatus',
      }),
      servicesList() {
        const filteredServices = this.getServices
          .filter(({ category }) => category !== 'promotions')
          .map(item => ({
            ...item,
            id: item.category,
          }));
        return filteredServices;
      },
    },
    watch: {
      getPromoCodeStatus(newVal, oldVal) {
        if (newVal && !oldVal) {
          this.$toasts.toast({
            id: nanoid(),
            intent: 'success',
            title: 'Success',
            message: 'Cod promo adaugat cu success',
          });
          this.resetForm();
        }
      },
    },
    methods: {
      ...mapActions({
        fetchServices: 'services/fetchServices',
        createPromoCode: 'admin/createPromoCode',
      }),
      onAddService(item) {
        const index = this.userData.service_ids.indexOf(item.id);
        if (index > -1) {
          this.userData.service_ids.splice(index, 1);
        } else {
          this.userData.service_ids.push(item.id);
        }
      },
      getMassageServices(services, elitesRequired) {
        const filteredServices = {
          ...services,
          services: services.services.filter(service => service.elites_required === elitesRequired),
        };
        return filteredServices;
      },
      async handleSubmit() {
        let formData = new FormData();
        Object.entries(this.userData).forEach(([key, value]) => {
          if (key === 'service_ids') {
            this.userData.service_ids.forEach(item => formData.append('promo_code[service_ids][]', item));
          } else {
            formData.append(`promo_code[${key}]`, value);
          }
        });
        formData.append('promo_code[image]', this.promo_code);
        await this.createPromoCode(formData);
      },
      handleFileUpload() {
        this.promo_code = this.$refs['promo-code'].files[0];
        this.createImage(this.promo_code);
      },
      createImage(file) {
        var image = new Image();
        var reader = new FileReader();

        reader.onload = (e) => {
          this.image = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      resetForm() {
        this.userData = this.blankUserData;
        this.image = '';
        this.promo_code = {};
      },
    },

    setup(props, { emit }) {
      const blankUserData = {
        code: '',
        valid_from: null,
        valid_until: null,
        first_timers_only: false,
        uses_left: '',
        minimum_order_value: '',
        direct_discount: '',
        percentage_discount: '',
        link_to_service: '',
        visible: false,
        service_ids: [],
      }

      const userData = ref(JSON.parse(JSON.stringify(blankUserData)))

      return {
        blankUserData,
        userData,
      }
    },
  }
</script>

<style lang="scss">
@import '@/core/scss/vue/libs/vue-select.scss';

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}

#promo-code {
  position: absolute;
  visibility: hidden;
}
  .promo-code-container {
    align-items: center;
    border-color: #ffffff;
    border-style: solid;
    box-shadow: 0 0 8px 3px #b8b8b8;
    display: flex;
    height: 140px;
    justify-content: center;
    position: relative;
    width: 240px;
  }

  .promo-code-container img,
  .promo-code-container figure {
    height: 140px;
    margin: 0;
    width: 240px;
  }

  .promo-code-container i {
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
