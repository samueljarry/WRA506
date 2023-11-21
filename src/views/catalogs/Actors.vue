<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import headers from '../../utils/headers';
import { ApiRoutesId } from '../../constants/ApiRoutesId';

  const actors = ref<Actor[]>();

  onMounted( async () => {
    actors.value = await fetch(
      ApiRoutesId.ACTORS, 
      headers
    ).then((res: Response) => res.json())
  })
</script>

<template>
  <section>
    <strong>Acteurs</strong>
    <div class="actors-list">
      <router-link 
        :to="{ path: `/actors/${actor.id}` }"
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