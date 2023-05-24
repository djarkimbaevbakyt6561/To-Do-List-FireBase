import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { fireBaseTodosReducer } from "./todos";

const rootReducer = combineReducers({
    todos: fireBaseTodosReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunk))