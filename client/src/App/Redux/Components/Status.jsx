/* eslint-disable react-refresh/only-export-components */
import {createSlice} from '@reduxjs/toolkit'; // 1. import combineReducers

const StatusSlice = createSlice({
    name: 'status',
    initialState: {
        InternetStatus : true,
    },
    reducers: {
        setInternetStatus: (state, action) => {
            state.InternetStatus = action.payload;
        },
        DeleteInternetStatus: (state) => {
            state.InternetStatus = null;
        },
    },
});


export const {setInternetStatus, DeleteInternetStatus} = StatusSlice.actions; // Export the Action
export default StatusSlice; // 2. export default Store