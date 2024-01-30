<script setup lang="ts">
  import { inject, ref, onMounted } from 'vue';
  import Panel from "primevue/panel";
  import 'primevue/resources/primevue.min.css'; // Added this line to import PrimeVue styles
  import Button from "primevue/button";
  import InputText from "primevue/inputtext";
  import Textarea from "primevue/textarea";
  import InputNumber from "primevue/inputnumber";
  import Dropdown from "primevue/dropdown"; 
import { useCategories } from '../hooks/useCategories';

  const dialogRef = inject('dialogRef');
  const { data } = dialogRef.value;
  const categories = ref([])

  onMounted(async () => {
    const cat = await useCategories();
    const names = cat.map((category) => category.name);
    categories.value = names
  })
  console.log(data)
</script>

<template>
  <Panel :header="data.title" style="background: #F5F5F5; padding: 10px 20px; border-radius: 8px; width: fit-content; margin: auto; width: 50svw; border: 1px solid #E4E4E4">
    <template #header>
        <strong class="font-bold">{{ data.title }}</strong>
    </template>
    <div class="body">
      <div class="input-field">
        <label for="title">Titre</label>
        <InputText id="title" type="text" :value="data.title"></InputText>
      </div>
      <div class="input-field">
        <label for="description">Description</label>
        <Textarea rows="10" columns="1000" id="description" type="text" :value="data.description"></Textarea>
      </div>
      <div class="input-field">
        <label for="description">Durée</label>
        <InputNumber rows="10" columns="1000" id="description" type="text" :value="data.description"></InputNumber>
      </div>
      <div class="input-field">
        <label for="description">Catégorie</label>
        <Dropdown rows="10" columns="1000" id="description" type="text" :options="categories"></Dropdown>
      </div>
    </div>
    <template class="footer" #footer>
        <Button class="valid-button">Valider</Button>
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

    input, textarea, select, li {
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