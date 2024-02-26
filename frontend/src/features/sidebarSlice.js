import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    forum_sidebar_quick: '',
    events_sidebar_quick: '',
    business_sidebar_quick: '',
    gallery_sidebar_quick: '',
    forum_keyword: '',
    events_keyword: '',
    business_keyword: '',
    gallery_keyword: '',
    forum_sidebar_open: false,
    events_sidebar_open: false,
    gallery_sidebar_open: false,
    selected_date: ''
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: initialState,
    reducers: {
        loadForumSidebarQuick: (state, action) => {
            state.forum_sidebar_quick = action.payload
        },
        loadGallerySidebarQuick: (state, action) => {
            state.gallery_sidebar_quick = action.payload
        },
        loadEventsSidebarQuick: (state, action) => {
            state.events_sidebar_quick = action.payload
        },
        loadBusinessSidebarQuick: (state, action) => {
            state.business_sidebar_quick = action.payload
        },
        loadForumSidebarKeyword: (state, action) => {
            state.forum_keyword = action.payload
        },
        loadGallerySidebarKeyword: (state, action) => {
            state.gallery_keyword= action.payload
        },
        loadEventsSidebarKeyword: (state, action) => {
            state.events_keyword = action.payload
        },
        loadBusinessSidebarKeyword: (state, action) => {
            state.business_keyword = action.payload
        },
        setIsForumSidebarOpen: (state, action) => {
            state.forum_sidebar_open = action.payload
        },
        setIsEventsSidebarOpen: (state, action) => {
            state.events_sidebar_open = action.payload
        },
        setIsGallerySidebarOpen: (state, action) => {
            state.gallery_sidebar_open = action.payload
        },
        loadSelectedDate: (state, action) => {
            state.selected_date = action.payload
        },
    },
})

export const {
    loadSelectedDate,
    setIsGallerySidebarOpen,
    setIsEventsSidebarOpen,
    setIsForumSidebarOpen,
    loadEventsSidebarKeyword,
    loadForumSidebarKeyword,
    loadGallerySidebarKeyword,
    loadGallerySidebarQuick,
    loadForumSidebarQuick,
    loadEventsSidebarQuick,
    loadBusinessSidebarQuick,
    loadBusinessSidebarKeyword
} = sidebarSlice.actions

export default sidebarSlice.reducer
