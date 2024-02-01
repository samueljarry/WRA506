<script setup lang="ts">
import { onMounted, ref } from 'vue';
import defaultHeaders from '../utils/requests/headers';
import { ApiRoutesId } from '../constants/ApiRoutesId';
import Card from 'primevue/card';
import Button from 'primevue/button';

  const films = ref<Movie[]>();
  const actors = ref<Actor[]>();

  onMounted( async () => {
    films.value = await fetch(ApiRoutesId.MOVIES, defaultHeaders)
      .then((res: Response) => res.json())
      .then((datas: Movie[]) => datas.slice(0, 4))

    actors.value = await fetch(ApiRoutesId.ACTORS, defaultHeaders)
      .then((res: Response) => res.json())
      .then((datas: Actor[]) => datas.slice(0, 4))
  })
</script>

<template>
  <section>
    <strong>Films</strong>
    <div class="films-list">
      <Card v-for="film in films" style="width: 20em">
        <template #title>{{ film.title }}</template>
        <template #content>{{ film.description.slice(0, 75) }}...</template>
        <template #footer>
          <router-link  :to="{ path: `/movies/${film.id}` }">
            <Button icon="pi pi-check" label="Save" >Voir plus</Button>
          </router-link>
        </template>
      </Card>
    </div>
  </section>

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

<style scoped>
  section {
    width: 100%;;
  }

  strong {
    font-size: 2rem;
    display: inline-block;
    margin-bottom: 20px;
  }

  .films-list, .actors-list {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 40px;
    gap: 15px;
  }

  .actor, .film {
    width: 200px;
    padding: 10px;
    border: 1px solid #F7F7F7;
    border-radius: 4px;
  }

</style>../utils/requests/headers