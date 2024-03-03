<script setup lang="ts">
  import defaultHeaders from '../../utils/requests/headers'
  import { onMounted, ref } from 'vue';
  import { useRoute, RouterLink } from 'vue-router';
  import { ApiRoutesId } from '../../constants/ApiRoutesId';
import MovieCard from '../../components/movie/MovieCard.vue';

  const route = useRoute();
  const { id } = route.params;
  
  const actor = ref<Actor | {[key:string]: undefined}>({
    firstName: undefined,
    lastName: undefined
  });
  
  onMounted( async () => {
    actor.value = await fetch(
      `${ ApiRoutesId.ACTORS }/${ id }`, 
      defaultHeaders
    ).then((res: Response) => res.json())
  })

</script>

<template>
  <section v-show="actor.firstName">
    <strong>{{ actor.firstName }} {{ actor.lastName }}</strong><br />
    <span>Nationalité: {{ actor?.nationality?.name }}</span><br/>
    <b>Filmographie</b>
    <div class="movies-list">
      <MovieCard v-for="movie in actor.movies" :key="movie.id" :movie="movie" />
    </div>
  </section>
</template>

<style scoped>
  strong {
    display: inline-block;
    margin-bottom: 20px;
    font-size: 2rem;
  }

  b {
    display: inline-block;
    margin-bottom: 10px;
    font-size: 1.6rem;
  }

  .movies-list {
    flex-wrap: wrap;
    display: flex;
    width: 100lvw;
    gap: 20px;
    margin-bottom: 40px;
  }

  .movie {
    width: 200px;
    padding: 10px;
    border: 1px solid #F7F7F7;
    border-radius: 4px;
    margin-bottom: 36px;
  }
</style>../../utils/requests/headers