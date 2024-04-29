import { configureStore } from "@reduxjs/toolkit";

import { loginReducer } from "./redux/reducers/loginReducer";
import { productReducer } from "./redux/reducers/productReducer";
export const store = configureStore({
  reducer: { loginReducer, productReducer }
});
