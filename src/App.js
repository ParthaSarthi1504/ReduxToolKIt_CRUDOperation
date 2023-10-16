import './App.css';
import { useState, memo, useEffect} from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { getTodosFromServer,addTodosToServer } from './Slicer/TodoSlicer';
import TodoList from './components/TotoList'
import {nanoid } from "@reduxjs/toolkit";

const App = () =>{
  let dispatch = useDispatch();
  let [inputTodo, setInputTodo] = useState('');
  let todoItems = useSelector((state) => state.todos);
  let ErrorMessage = useSelector((state)=> state.errMsg);
  // console.log(todoItems);
  const AddingTodo = ()=>{
    if (inputTodo !== ''){
      dispatch(addTodosToServer({id: nanoid(),
        todoText: inputTodo,
        edit: false}));
      setInputTodo('');
    }else{
      alert('The input box is Empty')
    }
  }
  // storing todoList into lovcal storage
  useEffect(()=>{
    // localStorage.setItem("yourTodos",JSON.stringify(todoItems));
    dispatch(getTodosFromServer())
  },[dispatch])

  return(
    <div className="min-h-screen flex flex-col items-center font-mono">
      <h1 className='font-bold text-[20px] m-[20px] sm:text-[25px] lg:text-[30px] 2xl:text-[30px]'>Todos Application</h1>
      <div className='flex justify-center items-center flex-wrap w-[100%]'>
        <input type='text' placeholder='Add Something...' className='w-[80%] h-[40px] pl-3 text-[17px] bg-slate-100 border-gray-200  border-1 rounded outline-none m-3 text-black shadow-lg shadow-indigo-500/50 sm:w-[350px] sm:h-[30px] sm:text-[15px] sm:pl-1 lg:w-[50%] lg:h-[43px] lg:text-[22px] lg:pl-3 2xl:w-[600px] 2xl:h-[40px] 2xl:pl-3' value={inputTodo} onChange={(e)=>setInputTodo(e.target.value)}/>
        <button className=' hidden bg-blue-600 text-white font-semibold text-[17px] w-[90px] h-[43px] rounded ml-5 sm:hidden lg:flex lg:justify-center lg:items-center ' onClick={AddingTodo}>Add Todo</button>
        <button className='bg-blue-600 text-white text-[30px] font-extrabold  h-[40px] w-[40px] m-3 flex justify-center items-center rounded sm:h-[30px] sm:w-[30px] sm:text-[30px] lg:hidden lg:w-[80px]' onClick={AddingTodo}>+</button>
      </div>
      {
        ErrorMessage !== '' && <p className='text-red-500 mt-5 text-[16px] font-semibold ease-out duration-300 sm:text-[15px] lg:text-[20px]'>{ErrorMessage}</p>
      }
      <ul className='mt-3 pb-5 w-[100%] flex flex-col items-center duration-[300ms] sm:mt-4 sm:mb-4 md:mt-6 md:pb-[7] lg:mt-8 lg:pb-8 '>
        {
          todoItems.length >0 ? todoItems.map(eachTodoItems =>(
            <TodoList key={eachTodoItems.id} todoDetails={eachTodoItems}/>
          )):(
            <p className='mt-20 text-[17px] text-gray-500  font-medium md:text-[20px] md:mt-36 xl:mt-56'>Your Todo List is Empty...</p>
          )
        }
      </ul>
    </div>
  )
}

export default memo(App);