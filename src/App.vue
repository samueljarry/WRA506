<script setup lang="ts">
import { RouterView } from 'vue-router';
import Nav from './components/Nav.vue';
</script>

<template>
  <Nav />
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  main {
    padding: 0 100px;
    margin-top: 100px;
    position: relative;
    width: calc(100vw - 200px);
    height: fit-content;
  }
</style>
