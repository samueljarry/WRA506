<script setup lang="ts">
  import defaultHeaders from '../../utils/requests/headers'
  import { onMounted, ref } from 'vue';
  import { useRoute, RouterLink } from 'vue-router';
  import { ApiRoutesId } from '../../constants/ApiRoutesId';
  import Image from 'primevue/image';
  import Rating from 'primevue/rating';

  const route = useRoute();
  const { id } = route.params;
  
  const date = ref<string>();
  const duration = ref<string>();
  const movie = ref<Partial<Movie>>({});
  
  onMounted( async () => {
    movie.value = await fetch(
      `${ ApiRoutesId.MOVIES }/${ id }`,
       defaultHeaders
    ).then((res: Response) => res.json());

    const releaseDate = new Date(movie.value.releaseDate as unknown as Date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    date.value = releaseDate.toLocaleDateString('fr-FR', options)

    const durationInSeconds = movie.value.duration as number;
    const hours = Math.floor(durationInSeconds / 60);
    const minutes = Math.floor(durationInSeconds - hours * 60);

    duration.value = `${hours} heure${hours > 1 ? 's' : '' } ${ minutes } ${ minutes > 1 ? 'minutes' : 'minute'}`
  })

</script>

<template>
  <section v-show="movie.title">
    <Image :src="movie.image?.filePath" /><br/>
    <strong>{{ movie.title }}</strong><br />
    <span><b>Date de sortie:</b> {{ date }}</span><br />
    <span><b>Synopsis:</b> {{ movie.description }}</span><br />
    <span><b>Catégorie:</b> <span v-show="movie.category?.name">{{ movie.category?.name }}</span></span><br />
    <span><b>Durée:</b> {{ duration }}</span><br />
    <span><b>Réalisateur:</b> {{ movie.director }}</span><br />
    <span><b>Note:</b><Rating readonly id="note" v-model="movie.note" :cancel="false"></Rating></span>
    <span><b>Nombre d'entrées:</b>{{ movie.entries }}</span><br/>
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

<style scoped lang="scss">
  ::v-deep(.p-image) {
    img {
      width: 20%;
      border-radius: 4px;
    }
  }
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