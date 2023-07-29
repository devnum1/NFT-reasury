import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: null,
};

export const selectedNft = createSlice({
  name: 'selectedNft',
  initialState,
  reducers: {
    select: (state, action) => {
      state.current = action?.payload;
    },
    clear: (state) => {
      state.current = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { select, clear } = selectedNft.actions;
export const selectedNftSelector = (state) => state.selectedNft;

export default selectedNft.reducer;
