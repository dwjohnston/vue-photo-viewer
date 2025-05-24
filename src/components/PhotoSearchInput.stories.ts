import type { Meta, StoryObj } from '@storybook/vue3';

import PhotoSearchInput from './PhotoSearchInput.vue';
import { provide, ref } from 'vue';
import { createMockFetchPhotos } from '../services/createMockFetchPhotos';
import type { PhotoSearchResponse } from '../services/fetchPhotos';

const meta = {
    title: 'Example/PhotoSearchInput',
    component: PhotoSearchInput,
    tags: ['autodocs'],

    argTypes: {
        onUpdateSearchQuery: { action: 'updateSearchQuery' },
    }

} satisfies Meta<typeof PhotoSearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;


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

