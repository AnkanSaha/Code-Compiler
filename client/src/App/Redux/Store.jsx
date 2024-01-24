import { combineReducers, configureStore } from "@reduxjs/toolkit"; // 1. import combineReducers

// Import App Config
import { isDevelopment } from "@app/App_Config";

// Import Redux Slice
import StatusSlice from "@redux/Components/Status"; // 1. import combineReducers
import SideBarToggleStatusSlice from "@redux/Components/SideBar"; // 1. import combineReducers
import CodeSlice from "@redux/Components/Code"; // 1. import combineReducers

// 4. Create a Main Store
const Store = configureStore({
  reducer: combineReducers({
    status: StatusSlice,
    SideBarToggle: SideBarToggleStatusSlice,
    Code: CodeSlice,
  }),
  devTools: isDevelopment,
});

// Export the Store
export default Store; // 2. export default Store
