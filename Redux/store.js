import { createStore } from "redux";
import MainReducer from "./reducer";
const store = createStore(MainReducer);

export default store;
