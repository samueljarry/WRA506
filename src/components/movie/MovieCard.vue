<template>
  <Card style="width: 25em" v-if="movie">
    <template #header>
      <img alt="movie-header" :src="movie.image.filePath" />
    </template>
    <template #title>{{ movie.title }}</template>
    <template #content>{{ movie.description.slice(0, 75) }}...</template>
    <template #footer>
      <div class="card-footer">
        <router-link :to="{ path: `/movies/${movie.id}` }">
          <Button icon="pi pi-check" label="Save">Voir plus</Button>
        </router-link>
        <div class="edit" v-if="userMail">
          <Button @click="showEditPanel" icon="pi pi-pencil" />
        </div>
        <div class="delete" v-if="userMail">
          <Button severity="danger" @click="showDeletePanel" icon="pi pi-trash" />
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useDialog } from 'primevue/usedialog';
import MovieEditPanel from './MovieEditPanel.vue';
import MovieDeletePanel from './MovieDeletePanel.vue';
import { defaultDialogProps } from '../../utils/defaultDialogProps';
import { LocalStorageId } from '../../constants/LocalStorageId';

const props = defineProps({
  movie: Object
});

const dialog = useDialog();
let userMail = ref<string | null>(null);


const showEditPanel = () => {
  dialog.open(MovieEditPanel, {
    props: {
      ...defaultDialogProps
    },
    data: {
      ...props.movie
    }
  });
};

const showDeletePanel = () => {
  dialog.open(MovieDeletePanel, {
    props: {
      ...defaultDialogProps
    },
    data: {
      ...props.movie
    }
  });
};

onMounted(() => {
  userMail.value = localStorage.getItem(LocalStorageId.USERMAIL);
})
</script>

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
      flex: 0.75;
      display: flex;
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