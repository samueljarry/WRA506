<script setup lang="ts">
import { onMounted, ref } from 'vue';
import headers from '../utils/headers';
import { ApiRoutesId } from '../constants/ApiRoutesId';

  const films = ref<Movie[]>();
  const actors = ref<Actor[]>();

  onMounted( async () => {
    films.value = await fetch(ApiRoutesId.MOVIES, headers)
      .then((res: Response) => res.json())
      .then((datas: Movie[]) => datas.slice(0, 4))

    actors.value = await fetch(ApiRoutesId.ACTORS, headers)
      .then((res: Response) => res.json())
      .then((datas: Actor[]) => datas.slice(0, 4))
  })
</script>

<template>
  <section>
    <strong>Films</strong>
    <div class="films-list">
      <router-link 
        :to="{ path: `/movies/${film.id}` }"
        v-for="film in films"
        class="film"
      >
        {{ film.title }}
      </router-link>
    </div>
  </section>

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
  }

  .actor, .film {
    width: 200px;
    padding: 10px;
    border: 1px solid #F7F7F7;
    border-radius: 4px;
  }

</style>