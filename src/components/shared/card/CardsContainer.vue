<template>
  <div id="accordion_services" role="tablist" class="add_bottom_15 accordion col-6">
    <slot />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'cards-container',
  });
</script>
