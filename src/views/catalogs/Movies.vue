<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import headers from '../../utils/headers';
import { ApiRoutesId } from '../../constants/ApiRoutesId';

  const films = ref<Movie[]>();
  const categories = ref<Category[]>();
  const filteredMovies = ref<Movie[]>();
  const research = ref('');
  const page = ref(1);

  const togglePage = async (targetPage: number) => {
    page.value = Math.min(Math.max(page.value+targetPage, 1), 4);
    
    filteredMovies.value = await fetch(
      `${ApiRoutesId.MOVIES}?num=10&page=${page.value}`, 
      headers
    ).then(res => res.json())
  }

  const filterCategory = async () => {
    filteredMovies.value = await fetch(
      `${ApiRoutesId.MOVIES}?title=${research.value}`, 
      headers
    ).then(res => res.json())
  }

  onMounted( async () => {
    films.value = await fetch(
      `${ApiRoutesId.MOVIES}?num=10&page=1`,
      headers
    ).then(res => res.json())

    filteredMovies.value = films.value;

    categories.value = await fetch(
      ApiRoutesId.CATEGORIES, 
      headers
    ).then(res => res.json())
  })

</script>

<template>
  <section>
    <strong>Films</strong>
    <button @click="togglePage(-1)">Previous Page</button>
    <button @click="togglePage(1)">Next Page</button>
    <div v-if="categories" class="filters">
      <input type="search" v-model="research" @input="filterCategory" />
    </div>
    <div class="films-list">
      <router-link 
        :to="{ path: `/movies/${film.id}` }"
        v-for="film in filteredMovies"
        class="film"
      >
        {{ film.title }}
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

  .films-list, .actors-list {
    flex-wrap: wrap;
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
    margin-bottom: 36px;
  }

</style>