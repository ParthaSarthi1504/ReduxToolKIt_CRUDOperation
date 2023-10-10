import {memo, useEffect} from 'react'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { removeTodo,editTodo,updateTodo,cancelTodoUpdate } from "../Slicer/TodoSlicer";
import { BiSolidEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import './style.css'
const TodoList = (props)=>{
    const dispatch = useDispatch();
    const {todoDetails} = props;
    const [input,setInput] = useState(todoDetails.todoText);
    const [deleteTodoAnimation, setDeleteTodoAnimation] = useState('');
    const UpdatationCancel = ()=>{
        setInput(todoDetails.todoText)
        dispatch(cancelTodoUpdate(todoDetails.id))
    }
    const deletingTodo = ()=>{
        setDeleteTodoAnimation("linear-animation-right");
    }
    useEffect(()=>{
        let deleteTimeOutId = '';
        if (deleteTodoAnimation !== ''){
            deleteTimeOutId= setTimeout(()=>{
                dispatch(removeTodo(todoDetails.id))
            },500) 
        }
        return ()=> clearTimeout(deleteTimeOutId)
    })

    return(
        <li className={`w-[1000px] h-[45px] bg-slate-100 shadow-lg shadow-slate-400  p-5 mt-5  flex justify-between items-center rounded-md ease-out duration-300 ${todoDetails.edit && "bg-slate-300 shadow-md shadow-slate-400  w-[1050px] h-[60px]"} linear-animation ${deleteTodoAnimation}`} >
            {
                todoDetails.edit ?(
                    <>
                        <input type='text' value={input}  onChange={(e)=>setInput(e.target.value)} className='ease-out duration-300 text-[20px] font-semibold text-black w-[400px] h-[35px] border-none outline-none bg-white pl-3 rounded-md' autoFocus/>
                        <div className='flex  items-center'>
                            <button className="bg-green-500 ease-out duration-300 text-white font-semibold h-[33px] w-[33px] flex justify-center items-center rounded mr-9"  onClick={()=>dispatch(updateTodo({todoId:todoDetails.id,updatedText:input}))}>
                                <TiTick className='ease-out duration-300 w-[30px] h-[27px]'/>
                            </button>
                            <button className="bg-red-600 ease-out duration-300 text-white font-semibold h-[33px] w-[33px] flex justify-center items-center rounded" onClick={UpdatationCancel}>
                                <ImCross className='ease-out duration-300 w-[15px] h-[15px]'/>
                            </button>
                        </div>
                    </>
                ):(
                    <>
                        <p className="text-[20px] font-semibold text-black ease-out duration-300">{todoDetails.todoText}</p>
                        <div className='flex  items-center'>
                            <button className="bg-green-500 ease-out duration-300 text-white font-semibold  text-[15px]  h-[30px] w-[30px] flex justify-center items-center rounded mr-9"  onClick={()=>dispatch(editTodo(todoDetails.id))}>
                                <BiSolidEditAlt className='ease-out duration-300'/>
                            </button>
                            <button className="bg-red-600 ease-out duration-300 text-white font-semibold  text-[15px]  h-[30px] w-[30px] flex justify-center items-center rounded" onClick={deletingTodo}>
                                <MdDelete className='ease-out duration-300'/>
                            </button>
                        </div>
                    </>
                )
            }            
        </li>
    )
}

export default memo(TodoList);