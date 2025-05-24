<script setup lang="ts">
import { defineEmits, inject } from 'vue';
import type { PhotoSearchResponse } from '../services/fetchPhotos';

// Define the props for the component


// Define an emit event to send the input value to the parent component
const emit = defineEmits(['updateSearchQuery']);

// 🧑‍🔬 No type safety for dependency injection? 🤮
const fetchPhotos = inject('fetchPhotos') as (query: string) => Promise<PhotoSearchResponse>;

const handleInput = async (event: Event) => {
    // 🧑‍🔬 I don't like having to manually specify the the change event/element types. 
    // In react if we inline the change handler, the types are inferred.
    const target = event.currentTarget as HTMLInputElement;


    // ☝️ Good use case for safe assignment syntax!
    // https://stackoverflow.com/questions/79090493/safe-assignment-operator-in-javascript-a-myth-or-reality
    let searchResult
    try {
        searchResult = await fetchPhotos(target.value);
    } catch (err) {

        // 💬 Bit of a question about how we want to handle errors. 
        // I'm thinking that blowing up the application is not needed. 
        // Could display a toast like message I think. 
        // So would dispatch one from here.
        searchResult = null;
    }
    emit('updateSearchQuery', searchResult);
};
</script>

<template>
    <div>
        <input type="text" placeholder="Search photos..." @input="handleInput" />
    </div>
</template>

<style scoped></style>
