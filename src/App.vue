<template>
  <RouterView />

  <LoaderComponent  />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import LoaderComponent from './components/LoaderComponent.vue';

</script>

<style scoped></style>
