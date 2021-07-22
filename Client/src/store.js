import { createStore, applyMiddleware } from "redux";
import rootReducer from "./Reducers";
import thunk from "redux-thunk";

export default createStore(rootReducer,applyMiddleware(thunk));    