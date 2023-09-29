<script setup lang="ts">
  import headers from '../../utils/headers'
  import { onMounted, ref } from 'vue';
  import { useRoute, RouterLink } from 'vue-router';

  const route = useRoute();
  const { id } = route.params;
  
  const date = ref<Date>();
  const duration = ref<string>();
  const movie = ref<Movie>({
    title: undefined,
    category: {
      name: undefined
    }
  });
  
  onMounted( async () => {
    movie.value = await fetch(`http://localhost:8088/s5/public/index.php/api/movies/${ id }`, headers)
      .then(res => res.json())

    const releaseDate = new Date(movie.value.releaseDate)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    date.value = releaseDate.toLocaleDateString('fr-FR', options)

    const hours = Math.floor(movie.value.duration / 60)
    const minutes = Math.floor(movie.value.duration - hours * 60)

    duration.value = `${hours} heure${hours > 1 ? 's' : '' } ${ minutes } ${ minutes > 1 ? 'minutes' : 'minute'}`
  })

</script>

<template>
  <section v-show="movie.title">
    <strong>{{ movie.title }}</strong><br />
    <span><b>Date de sortie:</b> {{ date }}</span><br />
    <span><b>Synopsis:</b> {{ movie.description }}</span><br />
    <span><b>Catégorie:</b> <span v-show="movie.category.name">{{ movie.category.name }}</span></span><br />
    <span><b>Durée:</b> {{ duration }}</span><br />
    <b>Casting</b>
    <div class="casting">
      <router-link 
        v-for="actor in movie.actor" 
        :to="{ path: `/actors/${ actor.id }` }"
        class="actor"
      >
        {{ actor.firstName }} {{ actor.lastName }}
      </router-link>
    </div>
  </section>
</template>

<style scoped>
  strong {
    display: inline-block;
    margin-bottom: 20px;
    font-size: 2rem;
  }

  span, span b {
    font-size: 16px;
  }

  b {
    display: inline-block;
    margin-bottom: 10px;
    font-size: 1.6rem;
  }

  .casting {
    flex-wrap: wrap;
    display: flex;
    width: 100%;
    gap: 20px;
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