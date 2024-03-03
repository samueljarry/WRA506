<script setup lang="ts">
  import { RouteRecordRaw, RouterLink } from 'vue-router';
  import router, { routes } from '../router';
  import { onMounted, ref, reactive } from 'vue';
  import { LocalStorageId } from '../constants/LocalStorageId';
import { LoginsAction } from '../utils/actions/LoginsAction';
  
  let userMail = reactive<{value: string|null}>({ value: null});
  const navRoutes = ref<Array<RouteRecordRaw>>(routes);

  const disconnect = (): void => {
    localStorage.clear();
    userMail.value = null;
    router.push('/');
  }

  onMounted(() => {
    const checkUserMail = () => {
      userMail.value = localStorage.getItem(LocalStorageId.USERMAIL);
    }

    checkUserMail();
    LoginsAction.Add(checkUserMail)

    return () => LoginsAction.Remove(checkUserMail)
  })
</script>

<template>
  <nav>
    <ul>
      <li v-for="route in navRoutes">
        <router-link :to="{ name: route.name, path: route.path }">
          {{ route.name }}
        </router-link>
      </li>
    </ul>
    <div v-show="userMail.value">
      <span>Compte: {{ userMail.value }}</span>
      <u @click="disconnect">Déconnexion</u>
    </div>
    <div v-show="!userMail.value">
      <router-link :to="{ name: 'Connexion', path: '/login' }">
          Connexion
      </router-link>
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