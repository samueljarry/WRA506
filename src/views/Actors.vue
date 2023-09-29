<script setup lang="ts">
import { onMounted, ref } from 'vue';
import headers from '../utils/headers';

  const actors = ref();

  onMounted( async () => {
    actors.value = await fetch('http://localhost:8088/s5/public/index.php/api/actors', headers)
      .then(res => res.json())
  })
</script>

<template>
  <section>
    <strong>Acteurs</strong>
    <div class="actors-list">
      <router-link 
        :to="{ path: '/actors' }"
        v-for="actor in actors"
        class="actor"
      >
        {{ actor.firstName }} {{ actor.lastName }}
      </router-link>
    </div>
  </section>
</template>

<style scoped>
  section {
    width: 100%;
  }

  strong {
    font-size: 2rem;
    display: inline-block;
    margin-bottom: 20px;
  }

  .actors-list {
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 40px;
  }

  .actor {
    width: 200px;
    padding: 10px;
    border: 1px solid #F7F7F7;
    border-radius: 4px;
    margin-bottom: 36px;
  }

</style>