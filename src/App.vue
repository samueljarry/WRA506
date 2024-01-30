<script setup lang="ts">
import { RouterView } from 'vue-router';
import Nav from './components/Nav.vue';
import DynamicDialog from 'primevue/dynamicdialog';

</script>

<template>
  <Nav />
  <main>
    <RouterView />
  </main>
  <DynamicDialog class="test" />
</template>

<style scoped lang="scss">
  main {
    padding: 0 100px;
    margin-top: 100px;
    position: relative;
    width: calc(100svw - 200px);
    height: fit-content;
  }

  ::v-deep(.p-dialog-mask.p-component-overlay) {
    background: #11111199 !important;
  }
</style>
