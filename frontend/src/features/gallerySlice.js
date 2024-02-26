import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    galleries: null,
    isImageCarouselShowing: false,
    selected_gallery: null,
    selected_galleryID: null
}

const gallerySlice = createSlice({
    name: 'gallery',
    initialState: initialState,
    reducers: {
        loadGallery: (state, action) => {
            state.galleries = action.payload
        },
        updateGallery: (state, action) => {
            state.galleries = state.galleries.map((gallery) =>
                gallery.id === action.payload.id ? action.payload : gallery
            );
        },
        createGalleryPost: (state, action) => {
            state.galleries = [...state.galleries, action.payload]
        },
        deleteGalleryPost: (state) => {
            state.galleries = state.galleries.filter((gallery) => gallery.id !== state.selected_galleryID)
        },
        toggleIsCarouselShowing: (state, action) => {
            state.isImageCarouselShowing = action.payload
        },
        loadSelectedGallery: (state, action) => {
            state.selected_gallery = state.galleries.find((gallery) => gallery.id === action.payload)
        },
        loadSelectedGalleryRepliesEvents: (state, action) => {
            state.selected_gallery = action.payload
        },
        loadSelectedGalleryID: (state, action) => {
            state.selected_galleryID = action.payload
        }
    },
})

export const {
    loadSelectedGalleryID,
    deleteGalleryPost,
    createGalleryPost,
    loadSelectedGalleryRepliesEvents,
    loadSelectedGallery,
    toggleIsCarouselShowing,
    updateGallery,
    loadGallery
} = gallerySlice.actions

export default gallerySlice.reducer