<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import router, { routes } from '../router';
  import { onMounted, ref } from 'vue';
  import { LocalStorageId } from '../constants/LocalStorageId';
  
  const userMail = ref<string | null>();

  const disconnect = () => {
    localStorage.clear();
    userMail.value = null;
    router.push('/');
  }

  onMounted(() => {
    userMail.value = localStorage.getItem(LocalStorageId.USERMAIL);
  })
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
    <div v-show="userMail">
      <span>Compte: {{ userMail }}</span>
      <u @click="disconnect">Déconnexion</u>
    </div>
  </nav>
</template>

<style scoped>
  nav {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top:0;
    left: 0;
    max-width: 100svw;
    width: 100%;
    align-items: center;

    div {
      gap: 20px;
      position:relative;
      right: 100px;
      display: inline-flex;
      text-align: end;

      u {
        cursor: pointer;
      }
    }
  }
  ul {
    padding: 10px 100px;
    list-style: none;
    display: flex;
    flex-direction: row;
    gap: 25px;
  }
</style>