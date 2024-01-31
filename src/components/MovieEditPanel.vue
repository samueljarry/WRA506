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
import { inject, onMounted, ref } from 'vue';
import { useActors } from '../hooks/useActors';
import { useCategories } from '../hooks/useCategories';
import { patchMovie } from '../utils/patchMovie';
import { DynamicDialogOptions } from 'primevue/dynamicdialogoptions';

  const dialogRef = inject<DynamicDialogOptions>('dialogRef') as DynamicDialogOptions;
  const { data } = dialogRef.value;
  const movie = ref<Movie>(data);
  const categories = ref([])
  const actors = ref<Partial<Actor>[]>([])
  
  const releaseDate = new Date(data.releaseDate);
  const day = ("0" + releaseDate.getDate()).slice(-2);
  const month = ("0" + (releaseDate.getMonth() + 1)).slice(-2);
  const year = releaseDate.getFullYear().toString().substr(2);

  movie.value.releaseDate = day + "/" + month + "/" + year;

  onMounted(async (): Promise<void> => {
    categories.value = await useCategories();
    const act = await useActors();
    const actorsNames: Partial<Actor>[] = act.map((actor: Actor) => ({ name: actor.firstName +' '+ actor.lastName, id: actor.id }));
    
    const filteredActors = actorsNames.filter((nameObj: Partial<Actor>) =>
      data.actor.some((actor: Partial<Actor>) => actor.id === nameObj.id)
    );

    actors.value = actorsNames
    movie.value.actor = filteredActors as Actor[]
  })
  
</script>

<template>
  <Panel :header="movie.title" style="background: #F5F5F5; padding: 10px 20px; border-radius: 8px; width: fit-content; margin: auto; width: 50svw; border: 1px solid #E4E4E4">
    <template #header>
        <strong class="font-bold">{{ movie.title }}</strong>
    </template>
    <div class="body">
      <div class="input-field">
        <label for="title">Titre</label>
        <InputText id="title" type="text" v-model="movie.title" :value="movie.title"></InputText>
      </div>
      <div class="input-field">
        <label for="description">Description</label>
        <Textarea rows="10" columns="1000" id="description" v-model="movie.description" type="text" :value="movie.description"></Textarea>
      </div>
      <div class="input-field">
          <label for="description">Description</label>
          <Calendar v-model="movie.releaseDate"  dateFormat="dd/mm/yy" />
        </div>
      <div class="input-field">
        <label for="duration">Durée (minutes)</label>
        <InputNumber id="duration" v-model="movie.duration"></InputNumber>
      </div>
      <div class="input-field">
        <label for="category">Catégorie</label>
        <Dropdown rows="10" columns="1000" id="category" type="text" :options="categories" optionLabel="name" v-model="movie.category" :placeholder="data.category.name"></Dropdown>
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
      <MultiSelect 
        v-model="movie.actor" 
        filter 
        class="multiselect" 
        id="actors" 
        display="chip" 
        :options="actors" 
        optionLabel="name" 
        placeholder="Chargement..." 
      />
    </div>
    <template class="footer" #footer>
        <Button @click="() => patchMovie(movie)" class="valid-button">Valider</Button>
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
    color:#F5F5F5; 
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

    input, textarea, select, li, ::v-deep(.p-inputtext) {
      padding: 7px 14px;
      background: #F5F5F5;
      border: 1px solid #E4E4E4;
      border-radius: 4px;
      outline: none;
      width: 80%;
      color: #555BEA;
      font-size: 18px;
      line-height: 140%;;
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;

      scrollbar-width: none; /* Pour Firefox */
      -ms-overflow-style: none;  /* Pour Internet Explorer and Edge */
      ::-webkit-scrollbar {
        display: none; /* Pour Safari and Chrome */
      }
      resize: none;
    }
  }
</style>