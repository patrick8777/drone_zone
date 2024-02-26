import {configureStore} from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import forumEventsSlice from "./features/forumEventsSlice.js";
import sidebarSlice from "./features/sidebarSlice.js";
import businessSlice from "./features/businessSlice.js";
import gallerySlice from "./features/gallerySlice.js";
import reviewsSlice from "./features/reviewsSlice.js";

const store = configureStore({
    reducer: {
        user: userSlice,
        forum_event: forumEventsSlice,
        sidebar: sidebarSlice,
        business: businessSlice,
        gallery: gallerySlice,
        reviews: reviewsSlice,
    },
})

export default store
