/* eslint-disable react-refresh/only-export-components */
import {createSlice} from '@reduxjs/toolkit'; // 1. import combineReducers

const SideBarToggleStatusSlice = createSlice({
    name: 'SideBarToggleStatus',
    initialState: true,

    reducers: {
        setSideBarToggleStatus: (state, action) => {
            return action.payload;
        },
    },
});


export const {setSideBarToggleStatus} = SideBarToggleStatusSlice.actions; // Export the Action
export default SideBarToggleStatusSlice; // 2. export default Store