<!-- eslint-disable -->
<template>
  <main>
    <transition name="app_a-fade" mode="out-in">
      <router-view :key="$route.fullpath" />
    </transition>
    <es-toasts />
  </main>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters } from 'vuex';

  export default Vue.extend({
    name: 'ease-app',
  });
</script>
