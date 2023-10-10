import './App.css';
import { useState, memo} from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { addTodo } from './Slicer/TodoSlicer';
import TodoList from './components/TotoList'

const App = () =>{
  let dispatch = useDispatch();
  let [inputTodo, setInputTodo] = useState('');
  let todoItems = useSelector((state) => state.todos);
  console.log(todoItems);
  const AddingTodo = ()=>{
    if (inputTodo !== ''){
      dispatch(addTodo(inputTodo));
      setInputTodo('');
    }else{
      alert('The input box is Empty')
    }
  }
  return(
    <div className="min-h-full flex flex-col items-center font-mono">
      <h1 className='font-bold text-[30px]  m-[20px] '>Todos Application</h1>
      <div>
        <input type='text' className='w-[500px] h-[35px] bg-slate-100  border-gray-200  border-1 rounded outline-none pl-3 text-black text-[17px] shadow-lg shadow-indigo-500/50' value={inputTodo} onChange={(e)=>setInputTodo(e.target.value)}/>
        <button className='bg-blue-600 text-white font-medium text-[14px]  h-[35px] w-[80px] rounded ml-10' onClick={AddingTodo}>Add Todo</button>
      </div>
      <ul className='mt-10 mb-[10] flex flex-col items-center duration-[300ms]'>
        {
          todoItems && todoItems.map(eachTodoItems =>(
            <TodoList key={eachTodoItems.id} todoDetails={eachTodoItems}/>
          ))
        }
      </ul>
    </div>
  )
}

export default memo(App);