<script setup lang="ts">
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import MultiSelect from 'primevue/multiselect';
import Panel from "primevue/panel";
import 'primevue/resources/primevue.min.css';
import { inject, onMounted, ref, reactive } from 'vue';
import { DynamicDialogOptions } from 'primevue/dynamicdialogoptions';
import { useMovies } from '../../hooks/useMovies';
import { useNationalities } from '../../hooks/useNationalities';
import { patchActor } from "../../utils/requests/actor/patchActor";
import { rewards } from '../../constants/rewards';
import { ActorsAction } from "../../utils/actions/ActorsAction";

const dialogRef = inject<DynamicDialogOptions>('dialogRef') as DynamicDialogOptions;
const { data } = dialogRef.value;
const actor = reactive<Actor>(data);

const movies = ref<Movie[]>([]);
const nationalities = ref<Nationality[]>([]);


const sendDatas = async (): Promise<void> => {
  await patchActor(actor);
  ActorsAction.Dispatch();

  dialogRef.value.close();
}

onMounted( async (): Promise<void> => {
  movies.value = await useMovies();
  nationalities.value = await useNationalities();
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
        <label for="firstName">Prénom</label>
        <InputText id="firstName" type="text" v-model="actor.firstName" :value="actor.firstName"></InputText>
      </div>
      <div class="input-field">
        <label for="lastName">Nom</label>
        <InputText id="lastName" type="text" v-model="actor.lastName" :value="actor.lastName"></InputText>
      </div>
      <div class="input-field">
        <label for="rewards">Récompenses</label>
        <MultiSelect 
          v-model="actor.rewards" 
          filter 
          class="multiselect" 
          id="rewards" 
          display="chip" 
          placeholder="Sélectionnez des récompenses" 
          :options="rewards" 
        />
      </div>
      <div class="input-field">
        <label for="nationality">Nationalité</label>
        <Dropdown id="nationality" type="text" :options="nationalities" optionLabel="name" v-model="actor.nationality" placeholder="Choisir une nationalité"></Dropdown>
      </div>
      <div class="input-field">
        <label for="movies">Films</label>
        <MultiSelect v-model="actor.movies" filter class="multiselect" id="movies" display="chip" placeholder="Sélectionnez des films" :options="movies" optionLabel="title" />
      </div>
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