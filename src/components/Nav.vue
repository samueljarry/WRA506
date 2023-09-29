<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { routes } from '../router';
</script>

<template>
  <nav>
    <ul>
      <li v-for="route in routes">
        <router-link :to="{ name: route.name, path: route.path }">
          {{ route.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  nav {
    position: absolute;
    top:0;
    left: 0;
    width: 100vw;
  }
  ul {
    padding: 10px 100px;
    list-style: none;
    display: flex;
    flex-direction: row;
    gap: 25px;
  }
</style>