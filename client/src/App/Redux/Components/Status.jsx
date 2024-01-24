/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit"; // 1. import combineReducers

const StatusSlice = createSlice({
  name: "status",
  initialState: {
    InternetStatus: true,
    LoadingStatus: false,
    LoadingMessage: null,
  },
  reducers: {
    setInternetStatus: (state, action) => {
      state.InternetStatus = action.payload;
    },
    setLoadingStatus: (state, action) => {
      state.LoadingStatus = action.payload;
    },
    setLoadingMessage: (state, action) => {
      state.LoadingMessage = action.payload;
    },
  },
});

export const { setInternetStatus, setLoadingStatus, setLoadingMessage } =
  StatusSlice.actions; // Export the Action
export default StatusSlice.reducer; // 2. export default Store
