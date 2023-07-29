import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoaded: false,
  isLoading: true,
};

export const refreshList = createSlice({
  name: 'refreshList',
  initialState,
  reducers: {
    setLoaded: (state, action) => {
      state.isLoaded = action?.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoaded, setLoading } = refreshList.actions;
export const refreshListSelector = (state) => state.refreshList;

export default refreshList.reducer;
