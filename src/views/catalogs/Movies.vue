<script setup lang="ts">
  import Button from 'primevue/button';
  import Card from 'primevue/card';
  import { useDialog } from 'primevue/usedialog';
  import { onMounted, ref } from 'vue';
  import MovieEditPanel from '../../components/MovieEditPanel.vue';
  import { ApiRoutesId } from '../../constants/ApiRoutesId';
  import { defaultDialogProps } from '../../utils/defaultDialogProps';
  import headers from '../../utils/headers';
  import Paginator from 'primevue/paginator';
  import InputText from 'primevue/inputtext';

  const films = ref<Movie[]>();
  const categories = ref<Category[]>();
  const filteredMovies = ref<Movie[]>();
  const research = ref('');
  const page = ref(1);
  const visible = ref(true);
  const dialog = useDialog();

  const togglePage = async ({ page: pageNum }: { page: number }) => {
    page.value = pageNum+1;
    
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
    <div class="top">
      <span  v-if="categories" class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="research" @input="filterCategory" placeholder="Search" />
      </span>
      <div class="paginator-container">
        <Paginator 
          class="paginator" 
          v-on:page="togglePage" 
          :rows="4" 
          :totalRecords="40" 
          :rowsPerPageOptions="[10]" 
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        />
      </div>
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

  ::v-deep(.p-paginator) {
    gap: 10px;
  }

  ::v-deep(.p-paginator-pages) {
    display: flex;
    gap: 5px;
  }

  ::v-deep(.p-paginator-element) {
    background:#F5F5F5;
    border: 1px solid #535bf2;
    color: #535bf2;
    transition: 0.2s ease;
  }

  ::v-deep(.p-paginator-element:hover) {
    background:#535bf2;
    color: #F5F5F5;
    transition: 0.2s ease;
  }

  ::v-deep(.p-highlight) {
    background:#535bf2;
    color: #F5F5F5;
    transition: 0.2s ease;
  }

  section {
    width: 100%;
  }

  .top {
    display: flex;
    width: 100%;
    margin: 20px 0;

    .paginator-container {
      flex: 0.75;
      display: flex;
      justify-content: center;
    }
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
  input {
    padding: 5px 30px;
    background: #F5F5F5;
    border: 1px solid #E4E4E4;
    border-radius: 8px;
    outline: none;
    width: 80%;
    color: #555BEA;
    font-size: 18px;
    line-height: 140%;;
  }

  ::v-deep(.p-input-icon-left) {
    i {
      margin-left: 10px;
    }
  }
</style>