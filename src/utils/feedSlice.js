import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addToFeed: (state, action) => {
            return action.payload;
        },
        removeFromFeed: (state, action) => {
            return null;
        }
    }
})
export const { addToFeed, removeFromFeed } = feedSlice.actions;
export default feedSlice.reducer;