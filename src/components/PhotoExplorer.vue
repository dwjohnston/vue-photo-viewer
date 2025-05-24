<script setup lang="ts">
import { ref } from 'vue';
import PhotoDisplay from './PhotoDisplay.vue';
import PhotoSearchInput from './PhotoSearchInput.vue';
import type { PhotoSearchResponse } from '../services/fetchPhotos';

const searchResult = ref<PhotoSearchResponse | null>(null)

const updateSearchResult = (result: PhotoSearchResponse | null) => {
    searchResult.value = result;
};

</script>

<template>
    <div>
        <div>photo explorer</div>
        <PhotoSearchInput @updateSearchQuery="updateSearchResult" />
        <PhotoDisplay :photos="searchResult" />
    </div>
</template>

<style scoped></style>
