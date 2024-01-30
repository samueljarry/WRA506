<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import headers from '../../utils/headers';
  import { ApiRoutesId } from '../../constants/ApiRoutesId';
  import Card from 'primevue/card';
  import Button from 'primevue/button';

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
        <Card v-for="actor in actors" style="width: 25em">
          <template #title>{{ actor.firstName }} {{ actor.lastName }}</template>
          <template #subtitle>A joué(e) dans {{ actor.movies.length }} film(s)</template>
          <template #footer>
            <router-link  :to="{ path: `/actors/${actor.id}` }">
              <Button icon="pi pi-check" label="Save" >Voir plus</Button>
            </router-link>
          </template>
        </Card>
    </div>
  </section>
</template>

<style scoped lang="scss">
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
    gap: 15px 0;
  }
</style>