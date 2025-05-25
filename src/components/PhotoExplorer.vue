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
    <div class="main-frame">
        <header>
            <h1>Acme Photo Explorer</h1>
            <PhotoSearchInput @updateSearchQuery="updateSearchResult" />
        </header>
        <PhotoDisplay :photos="searchResult" class="photo-display-container" />
        <footer>
            <p>
                David Johnston
            </p>
            <p>
                Copyright 2025
            </p>
        </footer>
    </div>
</template>

<style scoped>
.main-frame {
    height: 100vh;
    background: var(--background-color);
    color: var(--text-color);
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

header,
footer {
    background: var(--bg-color-header);
    padding: 1rem;
    text-align: center;
}

.photo-display-container {
    flex: 1 0 auto;
}

footer {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between
}
</style>
