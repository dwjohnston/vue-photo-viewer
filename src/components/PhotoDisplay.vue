<script setup lang="ts">
import type { PhotoSearchResponse } from './PhotoSearchInput.vue';

const { photos } = defineProps<{
    photos: PhotoSearchResponse | null
}>();
</script>

<template>
    <div>

        <div v-if="!photos">No photos to display</div>
        <div v-else class="photo-display">
            <div v-for="photo in photos.photos" :key="photo.id" class="photo-item">
                <img :src="photo.src.medium" :alt="photo.alt" />
                <p>{{ photo.photographer }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.photo-display {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.photo-item {
    margin-bottom: 20px;
}

.photo-item img {
    max-width: 100%;
    height: auto;
    display: block;
}
</style>
