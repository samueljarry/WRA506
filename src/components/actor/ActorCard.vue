<script setup lang="ts" >
  import { defineProps, ref, onMounted } from 'vue';
  import Card from 'primevue/card';
import Button from 'primevue/button';
import { useDialog } from 'primevue/usedialog';
import ActorEditPanel from './ActorEditPanel.vue';
import { defaultDialogProps } from '../../utils/defaultDialogProps';
import { LocalStorageId } from '../../constants/LocalStorageId';
import ActorDeletePanel from './ActorDeletePanel.vue';

  type Props = {
    actor: Actor;
  };

  const { actor } = defineProps<Props>();

const dialog = useDialog();
let userMail = ref<string | null>(null);


const showEditPanel = () => {
  console.log(actor)
  dialog.open(ActorEditPanel, {
    props: {
      ...defaultDialogProps
    },
    data: {
      ...actor
    }
  });
};

const showDeletePanel = () => {
  dialog.open(ActorDeletePanel, {
    props: {
      ...defaultDialogProps
    },
    data: {
      ...actor
    }
  });
};

onMounted(() => {
  userMail.value = localStorage.getItem(LocalStorageId.USERMAIL);
})
</script>

<template>
  <Card style="width: 25em">
    <template #title>{{ actor.firstName }} {{ actor.lastName }}</template>
    <template #subtitle>A joué(e) dans {{ actor.movies.length }} film(s)</template>
    <template #footer>
      <div class="card-footer">
        <router-link  :to="{ path: `/actors/${actor.id}` }">
          <Button icon="pi pi-check" label="Save" >Voir plus</Button>
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

<style lang="scss">
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
</style>