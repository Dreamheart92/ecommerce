import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        storeDataFromLocalStorage(state, action) {
            state.user = action.payload.user;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;