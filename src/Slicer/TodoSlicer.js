import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

// let  existingTodos = JSON.parse(localStorage.getItem('yourTodos'));

// if (existingTodos === null){
//     existingTodos = [];
// }

//GET 
export const getTodosFromServer = createAsyncThunk(
    "todos/getTodosFromServer",
    async(_,{rejectWithValue})=>{
        const response = await fetch("http://localhost:7000/todos");
        console.log(response);
        if (response.ok){
            const data = await response.json();
            console.log(data)
            return data;
        }else{
            return rejectWithValue({error: 'There is some Error'});
        }

    }
)

//POST 
export const addTodosToServer = createAsyncThunk(
    "todos/addTodosToServer",
    async(todoItems,{rejectWithValue})=>{
        let options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(todoItems)
        }
        const response = await fetch("http://localhost:7000/todos",options);
        if (response.ok){
            const data = await response.json();
            console.log('sending post data to state==> ',data)
            return data;
        }else{
            return rejectWithValue({error: 'The Todo is not Added'});
        }
    }
)

//PUT
export const updateTodosToServer = createAsyncThunk(
    "todos/updateTodosToServer",
    async(todoItem,{rejectWithValue})=>{
        console.log(todoItem);
        let options = {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(todoItem)
        }
        const response = await fetch(`http://localhost:7000/todos/${todoItem.id}`,options);
        console.log(response);
        if (response.ok){
            const data = await response.json();
            console.log(data)
            return data;
        }else{
            return rejectWithValue({error: 'The Todo is not Updated'});
        }
    }
)

//DELETE
export const deleteTodosFromServer = createAsyncThunk(
    "todos/deleteTodosFromServer",
    async(todoId,{rejectWithValue})=>{
        let options = {
            method: 'DELETE'
        }
        const response = await fetch(`http://localhost:7000/todos/${todoId}`,options);
        console.log(response);
        if (response.ok){
            const data = await response.json();
            console.log(data)
            return data; // it returns empty object
        }else{
            return rejectWithValue({error: 'The Todo is not Deleted'});
        }
    }
)

const TodoSlicer = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        isLoading: false,
        errMsg: ''
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
    },
    extraReducers: (builder)=>{
        builder
            .addCase(getTodosFromServer.pending,(state)=>{
                state.isLoading = true;
                state.todos = [];
            })
            .addCase(getTodosFromServer.fulfilled,(state,action)=>{
                console.log('data received to the state ==> ',action.payload)
                state.isLoading = false;
                state.errMsg = '';
                state.todos = action.payload;
            })
            .addCase(getTodosFromServer.rejected,(state,action)=>{
                state.isLoading = false;
                state.todos = [];
                state.errMsg = action.payload.error;
            })
            .addCase(addTodosToServer.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(addTodosToServer.fulfilled,(state,action)=>{
                console.log('receiving post data ==> ',action.payload)
                state.isLoading = false;
                state.errMsg = '';
                state.todos.push(action.payload);
            })
            .addCase(addTodosToServer.rejected,(state,action)=>{
                state.isLoading = false;
                state.errMsg = action.payload.error;
            })
            .addCase(updateTodosToServer.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(updateTodosToServer.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.errMsg = '';
                state.todos.forEach(eachTodo => {
                    if (eachTodo.id === action.payload.id){
                        eachTodo.edit= false;
                        eachTodo.todoText= action.payload.todoText;
                    }
                    return eachTodo
                })
            })
            .addCase(updateTodosToServer.rejected,(state,action)=>{
                state.isLoading = false;
                state.errMsg = action.payload.error;
            })
            .addCase(deleteTodosFromServer.pending,(state)=>{
                state.isLoading = true;
            })
            .addCase(deleteTodosFromServer.fulfilled,(state)=>{
                state.isLoading = false;
                state.errMsg = '';
            })
            .addCase(deleteTodosFromServer.rejected,(state,action)=>{
                state.isLoading = false;
                state.errMsg = action.payload.error;
            })
    }
})

export const {addTodo, removeTodo,editTodo,updateTodo,cancelTodoUpdate} = TodoSlicer.actions;

export default TodoSlicer.reducer;