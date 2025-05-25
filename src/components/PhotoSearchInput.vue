<script setup lang="ts">
import { defineEmits, inject } from 'vue';
import type { PhotoSearchResponse } from '../services/fetchPhotos';
import debounce from 'lodash.debounce';
import { PHOTO_SEARCH_INPUT_DEBOUNCE_MS } from '../constants/timing_constants';

const emit = defineEmits(['updateSearchQuery']);

// 🧑‍🔬 No automatic type safety for dependency injection? 🤮
// There is this: https://vuejs.org/guide/typescript/composition-api.html#typing-provide-inject
// But I can't currently work out how to use it. 
const fetchPhotos = inject('fetchPhotos') as (query: string) => Promise<PhotoSearchResponse>;
const debouncedFetchPhotos = debounce(async (query: string) => {

    // ☝️ Good use case for safe assignment syntax!
    // https://stackoverflow.com/questions/79090493/safe-assignment-operator-in-javascript-a-myth-or-reality
    let searchResult
    try {
        searchResult = await fetchPhotos(query);
    } catch (err) {

        // 💬 Bit of a question about how we want to handle errors. 
        // I'm thinking that blowing up the application is not needed. 
        // Could display a toast like message I think. 
        // So would dispatch one from here.
        searchResult = null;
    }

    emit('updateSearchQuery', searchResult);
}, PHOTO_SEARCH_INPUT_DEBOUNCE_MS);
const handleInput = async (event: Event) => {
    // 🧑‍🔬 I don't like having to manually specify the the change event/element types. 
    // In react if we inline the change handler, the types are inferred.
    const target = event.currentTarget as HTMLInputElement;
    if (target.value.length < 3) {
        return;
    }

    debouncedFetchPhotos(target.value);

};

</script>

<template>
    <div>
        <input type="text" placeholder="Search photos..." @input="handleInput" />
    </div>
</template>

<style scoped></style>
