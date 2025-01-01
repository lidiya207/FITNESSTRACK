import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.currentUser = action.payload.user;
            localStorage.setItem("fittrack-app-token", action.payload.token); // Correct key
        },
        logout: (state) => {
            state.currentUser = null;
            localStorage.removeItem("fittrack-app-token"); // Remove token on logout
        },
    },
});

export const { loginSuccess, logout } = userSlice.actions; // Fixed `actions`
export default userSlice.reducer;
