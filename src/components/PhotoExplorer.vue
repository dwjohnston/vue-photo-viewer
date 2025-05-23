<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PhotoDisplay from './PhotoDisplay.vue';
import PhotoSearchInput, { type PhotoSearchResponse } from './PhotoSearchInput.vue';

// Reactive variable to store the search query
const searchResult = ref<PhotoSearchResponse | null>(null)
const data = ref<string | null>(null);

const updateSearchQuery = (query: PhotoSearchResponse | null) => {
    searchResult.value = query;
};

</script>

<template>
    <div>
        <div>photo explorer</div>
        <!-- Pass the updateSearchQuery method to PhotoSearchInput -->
        <PhotoSearchInput @updateSearchQuery="updateSearchQuery" />
        <PhotoDisplay />
        <div v-if="data">{{ data }}</div>
        <div v-if="searchResult">Search Query: {{ searchResult }}</div>
    </div>
</template>

<style scoped></style>
