<script setup lang="ts">
import { onMounted, ref } from 'vue';
import headers from '../../utils/headers';
import { ApiRoutesId } from '../../constants/ApiRoutesId';

  const categories = ref<Category[]>();

  onMounted( async () => {
    categories.value = await fetch(
      ApiRoutesId.CATEGORIES, 
      headers
    ).then((res: Response) => res.json())
  })
</script>

<template>
  <section>
    <strong>Catégories</strong>
    <strong
      :to="{ path: '/categories' }"
      v-for="category in categories"
      class="category"
    >
      {{ category.name }}
      <div class="movies-list">
        <router-link 
          class="movie"
          :to="{ path: `/movies/${ movie.id }` }"
          v-for="movie in category.movies"
        >
          {{ movie.title }}
        </router-link>
      </div>
    </strong>
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

  .category {
    font-size: 1.6rem;
  }

  .movies-list {
    flex-wrap: wrap;
    display: flex;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 30px;
    gap: 20px;
  }

  .movies-list a {
    font-size: 16px;
  }

  .movie {
    width: 200px;
    padding: 10px;
    border: 1px solid #F7F7F7;
    border-radius: 4px;
    margin-bottom: 10px;
  }

</style>