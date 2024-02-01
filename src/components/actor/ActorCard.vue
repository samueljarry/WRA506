<script setup lang="ts" >
  import { defineProps } from 'vue';
  import Card from 'primevue/card';
import Button from 'primevue/button';

  type Props = {
    actor: Actor;
  };

  const { actor } = defineProps<Props>();
</script>

<template>
  <Card style="width: 25em">
    <template #title>{{ actor.firstName }} {{ actor.lastName }}</template>
    <template #subtitle>A joué(e) dans {{ actor.movies.length }} film(s)</template>
    <template #footer>
      <router-link  :to="{ path: `/actors/${actor.id}` }">
        <Button icon="pi pi-check" label="Save" >Voir plus</Button>
      </router-link>
    </template>
  </Card>
</template>