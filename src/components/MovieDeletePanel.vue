<script setup lang="ts">
import { inject, ref } from 'vue';
import Panel from 'primevue/panel';
import { ApiRoutesId } from '../constants/ApiRoutesId';
import { DynamicDialogOptions } from 'primevue/dynamicdialogoptions';
import defaultHeaders from '../utils/headers';
import { MethodsId } from '../constants/MethodsId';
import { MoviesAction } from '../utils/MoviesAction';

  const dialogRef = inject<DynamicDialogOptions>('dialogRef') as DynamicDialogOptions;
  const { data } = dialogRef.value;
  const movie = ref<Movie>(data);
  
  const closeModal = (): void => {
    dialogRef.value.close()
  }

  const deleteMovie = async (): Promise<void> => {
    await fetch(ApiRoutesId.MOVIES + `/${movie.value.id}`, {
      headers: {
        ...defaultHeaders.headers
      },
      method: MethodsId.DELETE
    })

    MoviesAction.Dispatch();
    dialogRef.value.close()
  }
</script>

<template>
  <Panel :header="movie.title" style="background: #F5F5F5; padding: 10px 20px; border-radius: 8px; width: fit-content; margin: auto; width: 50svw; border: 1px solid #E4E4E4">
    <template #header>
        <strong class="font-bold">Voulez-vous vraiment supprimer "<i>{{ movie.title }}</i>"?</strong>
    </template>
    <template class="footer" #footer>
      <div class="footer">
        <Button @click="deleteMovie" class="valid-button">Supprimer</Button>
        <Button @click="closeModal">Annuler</Button>
      </div>
    </template>
  </Panel>
</template>

<style scoped lang="scss">
  strong {
    color:#DD524C;
  }

  .footer {
    margin-top: 20px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row-reverse;
    gap: 10px;

    button {
      background: #F5F5F5;
      transition: 0.2s ease;

      &:first-child {
        border: 1px solid #DD524C;
        color: #DD524C;

        &:hover {
          transition: 0.2s ease;
          background: #DD524C;
          color: #F5F5F5;
        }
      }

      &:last-child {
        border: 1px solid #535bf2;
        color: #535bf2;

        &:hover {
          transition: 0.2s ease;
          background: #535bf2;
          color: #F5F5F5;
        }
      }
    }
  }
</style>