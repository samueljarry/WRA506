<script setup lang="ts">
import { onMounted, ref } from 'vue';
import defaultHeaders from '../utils/requests/headers';
import { ApiRoutesId } from '../constants/ApiRoutesId';
import MovieCard from '../components/movie/MovieCard.vue';
import ActorCard from '../components/actor/ActorCard.vue';

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
      <MovieCard v-for="film in films" :key="film.id" :movie="film" />
    </div>
  </section>

  <section>
    <strong>Acteurs</strong>
    <div class="actors-list">
      <ActorCard v-for="actor in actors" :actor="actor" :key="actor.id" />
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

</style>