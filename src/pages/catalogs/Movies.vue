<script setup lang="ts">
  import { debounce } from 'lodash'
  import Button from 'primevue/button';
  import { useDialog } from 'primevue/usedialog';
  import { onMounted, ref, reactive } from 'vue';
  import { ApiRoutesId } from '../../constants/ApiRoutesId';
  import { defaultDialogProps } from '../../utils/defaultDialogProps';
  import defaultHeaders from '../../utils/requests/headers';
  import Paginator from 'primevue/paginator';
  import InputText from 'primevue/inputtext';
  import { MoviesAction } from '../../utils/actions/MoviesAction';
  import MovieAddPanel from '../../components/movie/MovieAddPanel.vue';
  import MovieCard from '../../components/movie/MovieCard.vue';
  import { LocalStorageId } from '../../constants/LocalStorageId';

  const categories = ref<Category[]>([]);
  const filteredMovies = ref<Movie[]>([]);
  const research = reactive({ value: ''});
  const page = ref(1);
  const dialog = useDialog();
  const userMail = ref<string | null>(null);

  const togglePage = async ({ page: pageNum }: { page: number }) => {
    page.value = pageNum+1;
    
    filteredMovies.value = await fetch(
      `${ApiRoutesId.MOVIES}?num=10&page=${page.value}`, 
      defaultHeaders
    ).then(res => res.json())
  }

  const filterCategory = debounce(async () => {
    filteredMovies.value = await fetch(
      `${ApiRoutesId.MOVIES}?title=${research.value}`, 
      defaultHeaders
    ).then(res => res.json())
  }, 200); 

  const showAddPanel = () => {
    dialog.open(MovieAddPanel, {
      props: {
        ...defaultDialogProps
      }
    })
  }

  onMounted( async () => {
    userMail.value = localStorage.getItem(LocalStorageId.USERMAIL);
    const fetchMovies = async (): Promise<void> => {
      filteredMovies.value = await fetch(
        `${ApiRoutesId.MOVIES}?num=10&page=${page.value}`,
        defaultHeaders
      ).then(res => res.json())
    }
    
    const movies = await fetch(`${ApiRoutesId.MOVIES}?num=10&page=1`, defaultHeaders).then(res => res.json());
    filteredMovies.value = movies;

    categories.value = await fetch(
      ApiRoutesId.CATEGORIES, 
      defaultHeaders
    ).then(res => res.json())

    MoviesAction.Add(fetchMovies);

    return () => {
      MoviesAction.Remove(fetchMovies);
    }
  })

</script>

<template>
  <section>
    <strong>Films</strong>
    <div class="top">
      <span  v-if="categories" class="p-input-icon-left">
        <i class="pi pi-search" />
        <InputText v-model="research.value" @input="filterCategory" placeholder="Search" />
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
      <Button v-if="userMail" style="background: #535bf2" class="add" @click="showAddPanel">Ajouter un film</Button>
    </div>
    <div class="films-list">
      <MovieCard v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
    </div>
  </section>
</template>

<style scoped>

  ::v-deep(.p-card-header) {
    width: 100%;
    object-fit: contain; 

    img {
      width: 100%;
      border-radius: 4px;
    }
  }
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
    justify-content: space-between;
    width: 100%;
    margin: 20px 0;

    .paginator-container {
      pointer-events: none;
      position:absolute;
      display: flex;
      z-index: 0;
      width: calc(100% - 200px);
      justify-content: center;

      * {
        pointer-events: auto;
      }
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
      .edit, .delete {
        opacity: 1;
        visibility: visible;
        transition: 0.2s ease;
      }
    }
    .edit, .delete {
      cursor: pointer;
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

        transition: 0.2s ease;

        &:hover {
          background: #535bf2;
          color: #F5F5F5;
          transition: 0.2s ease;
        }
      }
    }

    .delete { 
      margin: 0;
      button {
        padding: 0.6em;
        aspect-ratio: 1;
        border: 2px solid #DD524C;
        color: #DD524C;
        background: #F5F5F5;
        transition: 0.2s ease;

        &:hover {
          background: #DD524C;
          color: #F5F5F5;
          transition: 0.2s ease;
        }
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