<script setup lang="ts">
import type { PhotoSearchResponse } from '../services/fetchPhotos';



const { photos } = defineProps<{
    photos: PhotoSearchResponse | null
}>();
</script>

<template>
    <div>

        <div v-if="!photos" class="no-photos-message">No photos to display</div>
        <div v-else class="photo-display">
            <div v-for="photo in photos.photos" :key="photo.id" class="photo-item">
                <img :src="photo.src.medium" :alt="photo.alt" />
                <p>{{ photo.photographer }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-photos-message {
    text-align: center;
    font-size: 1.5rem;
    color: var(--text-color);
    margin-top: 20px;
}

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
