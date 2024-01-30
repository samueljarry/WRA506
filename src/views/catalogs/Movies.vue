<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import headers from '../../utils/headers';
  import { ApiRoutesId } from '../../constants/ApiRoutesId';
  import MovieEditPanel from '../../components/MovieEditPanel.vue';
  import Card from 'primevue/card'
  import Button from 'primevue/button';
  import { useDialog } from 'primevue/usedialog';
import { defaultDialogProps } from '../../utils/defaultDialogProps';

  const films = ref<Movie[]>();
  const categories = ref<Category[]>();
  const filteredMovies = ref<Movie[]>();
  const research = ref('');
  const page = ref(1);
  const visible = ref(true);
  const dialog = useDialog();

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

  const showEditPanel = (movie: Movie) => {
    dialog.open(MovieEditPanel, {
      props: {
        ...defaultDialogProps
      },
      data: {
        ...movie
      }
    })
    visible.value = !visible.value;
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
      <Card v-for="movie in filteredMovies" style="width: 25em">
        <template #title>{{ movie.title }}</template>
        <template #content>{{ movie.description.slice(0, 75) }}...</template>
        <template #footer>
          <div class="card-footer">
            <router-link  :to="{ path: `/movies/${movie.id}` }">
              <Button icon="pi pi-check" label="Save" >Voir plus</Button>
            </router-link>
            <div class="edit">
              <Button @click="() => showEditPanel(movie)" icon="pi pi-pencil" />
            </div>
          </div>
        </template>
      </Card>
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
    gap: 15px 0;
  }

  .actor, .film {
    width: 200px;
    padding: 10px;
    border: 1px solid #F7F7F7;
    border-radius: 4px;
    margin-bottom: 36px;    
  }

  .card-footer {
    display: flex;
  }

  .p-card {
    &:hover {
      .edit {
        opacity: 1;
        visibility: visible;
        transition: 0.2s ease;
      }
    }
    .edit {
      visibility: hidden;
      opacity:0;
      margin: 0 10px;
      gap: 10px;
  
      button {
        padding: 0.6em;
        aspect-ratio: 1;
        border: 2px solid #535bf2;
        color: #535bf2;
        background: #F5F5F5;
      }
    }
  }
</style>