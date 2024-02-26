import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    validAccessToken: undefined,
    userData: null,
    allUsers: [],
    selected_user: null,
    selected_user_id: null
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.validAccessToken = action.payload;
        },
        loadUser: (state, action) => {
            state.userData = action.payload;
        },
        logout: (state) => {
            state.validAccessToken = null;
            state.userData = null;
        },
        loadAllUsers: (state, action) => {
            state.allUsers = action.payload;
        },
        loadSelectedUserID: (state, action) => {
            state.selected_user_id = action.payload;
        },
        loadSelectedUser: (state, action) => {
            state.selected_user = action.payload;
        },
        changePassword: (state, action) => {
            if (state.userData) {
                state.userData.password = action.payload;
            }
        }
    },
});

export const {
    loadSelectedUserID,
    loadSelectedUser,
    login,
    loadUser,
    logout,
    loadAllUsers,
    changePassword
} = userSlice.actions;

export default userSlice.reducer;
