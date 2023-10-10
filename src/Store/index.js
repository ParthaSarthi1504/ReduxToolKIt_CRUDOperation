import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from '../Slicer/TodoSlicer';


const store =  configureStore({
    reducer: TodoReducer
});

export default store