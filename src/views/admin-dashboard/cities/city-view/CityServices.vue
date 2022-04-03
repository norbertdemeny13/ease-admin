<template>
  <div>
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col
            cols="12"
            lg="6"
          >
            <div class="d-flex flex-wrap">
              <b-button
                variant="primary"
                @click="onSave"
              >
                Salveaza
              </b-button>
            </div>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-card :title="$t('views.pro_dashboard.qualifications')">
      <b-row>
        <es-cards-container>
          <es-card
            v-for="service in servicesList"
            :id="service.id"
            :key="service.id"
            :title="service.title"
          >
            <template v-slot>
              <div v-for="item in service.items" :key="item.id" class="col-md-12">
                <div v-if="item.name === 'couple'">
                  <p class="mt-1 mb-1">{{ $t('generic.message_couple_t1') }}</p>
                  <div
                    v-for="serviceItem in getMassageServices(item, 1).services"
                    :key="serviceItem.id"
                    class="d-flex"
                  >
                    <div class="checkboxes mr-2">
                      <label :class="`container_check`" @click.prevent="onAddService(serviceItem)">
                        {{ $t(serviceItem.name) }}
                        {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                        {{ `${service.category === 'massage' ? 'min' : ''}` }}
                        <input type="checkbox" :checked="service_ids.includes(serviceItem.id) ? 'checked' : ''">
                        <span class="checkmark" />
                      </label>
                    </div>
                  </div>
                  <p class="mt-1 mb-1">{{ $t('generic.message_couple_t2') }}</p>
                  <div
                    v-for="serviceItem in getMassageServices(item, 2).services"
                    :key="serviceItem.id"
                    class="d-flex"
                  >
                    <div class="checkboxes">
                      <label :class="`container_check`" @click.prevent="onAddService(serviceItem)">
                        {{ $t(serviceItem.name) }}
                        {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                        {{ `${service.category === 'massage' ? 'min' : ''}` }}
                        <input type="checkbox" :checked="service_ids.includes(serviceItem.id) ? 'checked' : ''">
                        <span class="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <p class="mt-1 mb-1">{{ $t(item.name) }}</p>
                  <div
                    v-for="serviceItem in item.services"
                    :key="serviceItem.id"
                    class="d-flex"
                  >
                    <div class="checkboxes mr-2">
                      <label :class="`container_check`" @click.prevent="onAddService(serviceItem)">
                        {{ $t(serviceItem.name) }}
                        {{ `${service.category === 'massage' ? serviceItem.duration : ''}` }}
                        {{ `${service.category === 'massage' ? 'min' : ''}` }}
                        <input type="checkbox" :checked="service_ids.includes(serviceItem.id) ? 'checked' : ''">
                        <span class="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </es-card>
        </es-cards-container>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';
  import { BCard, BCol, BCardBody, BRow, BFormCheckbox, BButton } from 'bootstrap-vue';
  import { Card, CardsContaienr } from '@/components/shared/card';
  import { isEqual } from 'lodash-es';

  export default Vue.extend({
    name: 'es-elite-services',

    components: {
      BCard,
      BCardBody,
      BCol,
      BRow,
      BFormCheckbox,
      BButton,
      'es-card': Card,
      'es-cards-container': CardsContaienr,
    },

    props: {
      services: {
        type: Array,
        required: true,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      service_ids: [],
    }),

    computed: {
      ...mapGetters({
        getServices: 'services/getServices',
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

    methods: {
      ...mapActions({
        fetchServices: 'services/fetchServices',
        saveServices: 'admin/saveServices',
      }),

      getMassageServices(services, elitesRequired) {
        const filteredServices = {
          ...services,
          services: services.services.filter(service => service.elites_required === elitesRequired),
        };
        return filteredServices;
      },

      onAddService(item) {
        if (this.disabled) {
          return;
        }

        const index = this.service_ids.indexOf(item.id);
        if (index > -1) {
          this.service_ids.splice(index, 1);
        } else {
          this.service_ids.push(item.id);
        }
      },

      updateServices() {
        if (this.services) {
          this.service_ids = this.services;
        }
      },

      async onSave() {
        const cityId = this.$router.currentRoute.params.id;
        await this.saveServices({ serviceIds: this.service_ids, cityId });
      },
    },

    async created() {
      await this.fetchServices();
      await this.updateServices();
    }
  });
</script>

<style>
i.indicator {
  color: #7367f0 !important;
}
</style>
