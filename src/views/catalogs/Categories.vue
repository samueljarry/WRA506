<script setup lang="ts">
import { onMounted, ref } from 'vue';
import defaultHeaders from '../../utils/requests/headers';
import { ApiRoutesId } from '../../constants/ApiRoutesId';
import Card from 'primevue/card';

  const categories = ref<Category[]>();

  onMounted( async () => {
    categories.value = await fetch(
      ApiRoutesId.CATEGORIES, 
      defaultHeaders
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
        <Card v-for="movie in category.movies">
          <template #content>
            <router-link 
              class="movie"
              :to="{ path: `/movies/${ movie.id }` }"
            >
              {{ movie.title }}
            </router-link>
          </template>
        </Card>
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

</style>../../utils/requests/headers