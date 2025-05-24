<script setup lang="ts">
import { provide } from 'vue'

import PhotoExplorer from './components/PhotoExplorer.vue';
import { fetchPhotos } from './services/fetchPhotos';

provide("fetchPhotos", fetchPhotos);
</script>

<template>

  <PhotoExplorer />
</template>

<style scoped></style>
