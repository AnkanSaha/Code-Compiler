/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit"; // 1. import combineReducers

const CodeSlice = createSlice({
  name: "Code",
  initialState: {
    Language: "",
    Code: "",
    SessionID: "",
    Packages: [],
    Output: "",
    FileName: "",
  },
  reducers: {
    setCode: (state, action) => {
      state.Code = action.payload;
    },
    setLanguage: (state, action) => {
      state.Language = action.payload;
    },
    setSessionID: (state, action) => {
      state.SessionID = action.payload;
    },
    setPackages: (state, action) => {
      state.Packages.push(action.payload);
    },
    setOutput: (state, action) => {
      state.Output = action.payload;
    },
    setFileName: (state, action) => {
      state.FileName = action.payload;
    },
  },
});

export const {
  setCode,
  setLanguage,
  setSessionID,
  setPackages,
  setOutput,
  setFileName,
} = CodeSlice.actions; // Export the Action
export default CodeSlice.reducer; // 2. export default Store
