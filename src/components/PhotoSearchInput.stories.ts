import type { Meta, StoryObj } from '@storybook/vue3';

import PhotoSearchInput from './PhotoSearchInput.vue';
import { provide, ref } from 'vue';
import { createMockFetchPhotos } from '../services/createMockFetchPhotos';
import type { PhotoSearchResponse } from '../services/fetchPhotos';
import { expect, fn, userEvent, within } from '@storybook/test';
import { PHOTO_SEARCH_INPUT_DEBOUNCE_MS } from '../constants/timing_constants';

const mockFn = fn();

const meta = {
    title: 'Example/PhotoSearchInput',
    component: PhotoSearchInput,
    tags: ['autodocs'],


    argTypes: {
        onUpdateSearchQuery: { action: 'updateSearchQuery' },
    },
    beforeEach: () => {
        mockFn.mockClear();
    },
    render: (args) => ({
        components: { PhotoSearchInput },
        setup() {
            const searchQuery = ref<PhotoSearchResponse | null>(null);


            const fetchPhotos = createMockFetchPhotos();
            console.log(args);
            provide('fetchPhotos', (query: string) => {
                mockFn(query);
                return fetchPhotos(query);
            });

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
                <p v-for="photo in searchQuery?.photos || []" :key="photo.id">{{ photo.alt }}</p>
            </label>
          </div>
        `,


    }),

} satisfies Meta<typeof PhotoSearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {}

/**
 * Only displays the matching results.
 */
export const RegularExperienceTest: Story = {

    play: async (playContext) => {
        const { canvasElement } = playContext;
        playContext.step
        const canvas = within(canvasElement);

        expect(mockFn).not.toHaveBeenCalled();

        expect(canvas.queryByText("Foo #1")).not.toBeInTheDocument();
        expect(canvas.queryByText("Foo #2")).not.toBeInTheDocument();
        expect(canvas.queryByText("Bar #1")).not.toBeInTheDocument();
        expect(canvas.queryByText("Food #1")).not.toBeInTheDocument();

        const input = canvas.getByRole('textbox');
        userEvent.type(input, 'foo');

        expect(await canvas.findByText("Foo #1")).toBeInTheDocument();
        expect(canvas.queryByText("Foo #2")).toBeInTheDocument();
        expect(canvas.queryByText("Bar #1")).not.toBeInTheDocument();
        expect(canvas.queryByText("Food #1")).toBeInTheDocument();

        expect(mockFn).toHaveBeenCalledWith('foo');
        expect(mockFn).toHaveBeenCalledTimes(1);
    },
};

/**
 * The query should only be triggered when the user has typed at least 3 letters.
 */
export const AtLeastThreeLettersTest: Story = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        expect(mockFn).not.toHaveBeenCalled();
        expect(canvas.queryByText("Foo #1")).not.toBeInTheDocument();
        expect(canvas.queryByText("Foo #2")).not.toBeInTheDocument();
        expect(canvas.queryByText("Bar #1")).not.toBeInTheDocument();
        expect(canvas.queryByText("Food #1")).not.toBeInTheDocument();

        const input = canvas.getByRole('textbox');
        userEvent.type(input, 'fo');

        expect(mockFn).not.toHaveBeenCalled();


        // 💬 Little bit of a tricky test scenario. 
        // We need to wait, but also expect nothing to have changed. 
        // I think this timeout is reasonable.
        // Happy to hear a better way to do this. 
        await new Promise((resolve) => setTimeout(resolve, PHOTO_SEARCH_INPUT_DEBOUNCE_MS * 1.5));

        expect(canvas.queryByText("Foo #1")).not.toBeInTheDocument();
        expect(canvas.queryByText("Foo #2")).not.toBeInTheDocument();
        expect(canvas.queryByText("Bar #1")).not.toBeInTheDocument();
        expect(canvas.queryByText("Food #1")).not.toBeInTheDocument();
        expect(mockFn).not.toHaveBeenCalled();

    },
};

/**
 * If the user types letters in quick succession, the query should only be triggered once after the user has stopped typing for a while.
 */
export const DebouncingTest: Story = {

    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);


        expect(mockFn).not.toHaveBeenCalled();
        expect(canvas.queryByText("Foo #1")).not.toBeInTheDocument();
        expect(canvas.queryByText("Foo #2")).not.toBeInTheDocument();
        expect(canvas.queryByText("Bar #1")).not.toBeInTheDocument();
        expect(canvas.queryByText("Food #1")).not.toBeInTheDocument();

        const input = canvas.getByRole('textbox');
        userEvent.type(input, 'food');

        expect(await canvas.findByText("Food #1")).toBeInTheDocument();

        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(mockFn).toHaveBeenCalledWith('food');

        expect(canvas.queryByText("Foo #1")).not.toBeInTheDocument();
        expect(canvas.queryByText("Foo #2")).not.toBeInTheDocument();
        expect(canvas.queryByText("Bar #1")).not.toBeInTheDocument();

    },
};

