import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reviews: [],
    selected_reviews: null,
    selected_reviews_id: null, // Fixed naming inconsistency
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: initialState,
    reducers: {
        createReviews: (state, action) => {
            state.reviews = [...state.reviews, action.payload];
        },
        loadReviews: (state, action) => {
            state.reviews = action.payload;
        },
        selectReviews: (state, action) => {
            state.selected_reviews = action.payload;
        },
        selectReviewsId: (state, action) => {
            state.selected_reviews_id = action.payload;
        },
    }
});

export const {
    createReviews,
    loadReviews,
    selectReviews,
    selectReviewsId
} = reviewsSlice.actions;

export default reviewsSlice.reducer;