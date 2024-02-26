import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    businesses: [],
    selected_business: null,

}

const businessSlice = createSlice({
    name: 'business',
    initialState: initialState,
    reducers: {
        createBusiness: (state, action) => {
            state.businesses = [...state.businesses, action.payload]
        },
        loadBusinesses: (state, action) => {
            state.businesses = action.payload;
        },
        selectBusiness: (state, action) => {
            state.selected_business = action.payload;
        }
    }
})

export const {
    createBusiness,
    loadBusinesses,
    selectBusiness
} = businessSlice.actions

export default businessSlice.reducer