import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addToFeed: (state, action) => {
            return action.payload;
        },
        removeUserFromFeed: (state, action) => {
            const newFeed = state.filter((user) => user._id !== action.payload);
            return newFeed;
        }
    }
})
export const { addToFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;