import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/vue3';

import PhotoSearchInput, { type PhotoSearchResponse } from './PhotoSearchInput.vue';
import { provide, ref } from 'vue';
import { createMockFetchPhotos } from '../services/createMockFetchPhotos';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: 'Example/PhotoSearchInput',
    component: PhotoSearchInput,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],

    argTypes: {
        onUpdateSearchQuery: { action: 'updateSearchQuery' }, // Capture the emitted event
    }

} satisfies Meta<typeof PhotoSearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
    render: (args) => ({
        components: { PhotoSearchInput },
        setup() {
            const searchQuery = ref<PhotoSearchResponse | null>(null);

            provide('fetchPhotos', createMockFetchPhotos());

            const handleUpdateSearchQuery = (result: PhotoSearchResponse | null) => {
                searchQuery.value = result;
                args.onUpdateSearchQuery?.(result);
            };

            return { args, searchQuery, handleUpdateSearchQuery };
        },
        template: `
          <div>
            <PhotoSearchInput @updateSearchQuery="handleUpdateSearchQuery" />
            <label>Result:
            <pre>
                {{ searchQuery }}
            </pre>
            </label>
          </div>
        `,
    }),
};

