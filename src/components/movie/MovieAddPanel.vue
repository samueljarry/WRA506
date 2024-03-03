<script setup lang="ts">
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import MultiSelect from 'primevue/multiselect';
import Panel from "primevue/panel";
import Rating from 'primevue/rating';
import Calendar from 'primevue/calendar';
import 'primevue/resources/primevue.min.css';
import Textarea from "primevue/textarea";
import { MoviesAction } from '../../utils/actions/MoviesAction';
import { DynamicDialogOptions } from 'primevue/dynamicdialogoptions';
import { inject, ref, onMounted } from 'vue';
import { getCategories } from '../../hooks/useCategories';
import { getActors } from '../../hooks/useActors';
import { addMovie } from '../../utils/requests/movie/addMovie';
import FileUpload, { FileUploadSelectEvent } from 'primevue/fileupload';


const dialogRef = inject<DynamicDialogOptions>('dialogRef') as DynamicDialogOptions;
const movie = ref<Partial<Movie>>({
  title: 'Titre du film',
  description: 'Description du film',
  duration: 60,
  releaseDate: '01/01/1990',
  director: 'Réalisateur',
  entries: 10000,
  note: 5,
  actor: [],
});
const categories = ref<Category[]>([])
const actors = ref<Partial<Actor>[]>([])
const file = ref<string | ArrayBuffer>('');

const sendDatas = async (): Promise<void> => {
  await addMovie({ ...movie.value, file: file.value });
  MoviesAction.Dispatch();

  dialogRef.value.close();
}

const onSelect = async ({ files }: FileUploadSelectEvent) => {
  await fetch(files[0].objectURL)
    .then(response => response.blob())
    .then(async (blob) => {
       const reader = new FileReader();
        reader.onloadend = function() {
            file.value = reader.result 
        }
        reader.readAsDataURL(blob);
     })
}

onMounted(async (): Promise<void> => {
  categories.value = await getCategories();
  const act = await getActors();
  const actorsNames: Partial<Actor>[] = act.map((actor: Actor) => ({ name: actor.firstName + ' ' + actor.lastName, id: actor.id }));

  actors.value = actorsNames
  movie.value.actor = [];
  movie.value.category = categories.value[0]
})
</script>

<template>
  <Panel
    style="background: #F5F5F5; padding: 10px 20px; border-radius: 8px; width: fit-content; margin: auto; width: 50svw; border: 1px solid #E4E4E4">
    <template #header>
      <strong class="font-bold">Ajouter un film</strong>
    </template>
    <div class="body">
      <div class="input-field">
        <label for="note">Note</label>
        <FileUpload mode="basic" name="demo[]" accept="image/*" :maxFileSize="1000000" @select="onSelect($event)" />
      </div>
      <div class="input-field">
        <label for="title">Titre</label>
        <InputText id="title" type="text" v-model="movie.title" :value="movie.title"></InputText>
      </div>
      <div class="input-field">
        <label for="description">Description</label>
        <Textarea rows="10" columns="1000" id="description" v-model="movie.description" type="text"
          :value="movie.description"></Textarea>
      </div>
      <div class="input-field">
        <label for="releaseDate">Date de sortie</label>
        <Calendar id="releaseDate" v-model="movie.releaseDate" dateFormat="dd/mm/yy" />
      </div>
      <div class="input-field">
        <label for="duration">Durée (minutes)</label>
        <InputNumber id="duration" v-model="movie.duration"></InputNumber>
      </div>
      <div class="input-field">
        <label for="category">Catégorie</label>
        <Dropdown id="category" type="text" :options="categories" optionLabel="name" v-model="movie.category" placeholder="Chargement..."></Dropdown>
      </div>
      <div class="input-field">
        <label for="director">Réalisateur</label>
        <InputText type="text" v-model="movie.director" :value="movie.director"></InputText>
      </div>
    </div>
    <div class="input-field">
      <label for="entries">Nombre d'entrées</label>
      <InputNumber id="entries" v-model="movie.entries"></InputNumber>
    </div>
    <div class="input-field">
      <label for="note">Note</label>
      <Rating id="note" v-model="movie.note" :cancel="false"></Rating>
    </div>
    <div class="input-field">
      <label for="actors">Acteurs</label>
      <MultiSelect v-model="movie.actor" filter class="multiselect" id="actors" display="chip" placeholder="Sélectionnez des acteurs" :options="actors"
        optionLabel="name" />
    </div>
    <template class="footer" #footer>
      <Button @click="sendDatas" class="valid-button">Valider</Button>
    </template>
  </Panel>
</template>

<style lang="scss" scoped>
::v-deep(.p-dialog-content) {
  display: flex;
  padding: 2px;
  background: white;
  border: 2px solid #EEEEEE;
  width: fit-content;
  place-self: center;
  align-self: center;
}

::v-deep(.p-panel-footer) {
  display: flex;
  justify-content: flex-end;
}

.valid-button {
  background: #55B785;
  font-weight: 700;
  color: #F5F5F5;
}

.body {
  margin-top: 20px;
}

.input-field {
  display: flex;
  gap: 5px;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    display: inline-flex;
    font-size: 18px;
    font-weight: 600;
  }

  input,
  textarea,
  select,
  li,
  ::v-deep(.p-inputtext) {
    padding: 7px 14px;
    background: #F5F5F5;
    border: 1px solid #E4E4E4;
    border-radius: 4px;
    outline: none;
    width: 80%;
    color: #555BEA;
    font-size: 18px;
    line-height: 140%;
    ;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;

    scrollbar-width: none;
    /* Pour Firefox */
    -ms-overflow-style: none;

    /* Pour Internet Explorer and Edge */
    ::-webkit-scrollbar {
      display: none;
      /* Pour Safari and Chrome */
    }

    resize: none;
  }
}</style>../utils/requests/patchMovie../../utils/actions/MoviesAction../../utils/requests/movie/addMovie