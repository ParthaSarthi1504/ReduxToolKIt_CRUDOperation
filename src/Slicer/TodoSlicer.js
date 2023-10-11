import { createSlice, nanoid } from "@reduxjs/toolkit";

let  existingTodos = JSON.parse(localStorage.getItem('yourTodos'));

if (existingTodos === null){
    existingTodos = [];
}

const TodoSlicer = createSlice({
    name: 'todos',
    initialState: {
        todos: existingTodos
    },
    reducers: {
        addTodo: (state,action) =>{
            state.todos.push({
                id: nanoid(),
                todoText: action.payload,
                edit: false
            })
        },
        editTodo: (state,action) =>{
            state.todos.forEach(eachTodo => {
                if (eachTodo.id === action.payload){
                    return eachTodo.edit= true;
                }
                return eachTodo
            })
        },
        removeTodo: (state,action) =>{
            const filteredTodos = state.todos.filter(eachTodo => eachTodo.id !== action.payload);
            state.todos = filteredTodos;
        },
        updateTodo: (state,action) =>{
            const {todoId,updatedText} = action.payload;
            console.log(todoId,updatedText)
            state.todos.forEach(eachTodo => {
                if (eachTodo.id === todoId){
                    eachTodo.edit= false;
                    eachTodo.todoText= updatedText;
                }
                return eachTodo
            })
            console.log(state.todos)
        },
        cancelTodoUpdate: (state,action) =>{
            state.todos.forEach(eachTodo => {
                if (eachTodo.id === action.payload){
                    return eachTodo.edit= false;
                }
                return eachTodo
            })
        },
    }
})

export const {addTodo, removeTodo,editTodo,updateTodo,cancelTodoUpdate} = TodoSlicer.actions;

export default TodoSlicer.reducer;