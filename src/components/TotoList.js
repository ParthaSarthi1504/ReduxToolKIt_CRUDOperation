import {memo, useEffect} from 'react'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { removeTodo,editTodo,cancelTodoUpdate,updateTodosToServer,deleteTodosFromServer } from "../Slicer/TodoSlicer";
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
                dispatch(deleteTodosFromServer(todoDetails.id))
                    .then(()=>dispatch(removeTodo(todoDetails.id)))
            },500) 
        }
        return ()=> clearTimeout(deleteTimeOutId)
    })

    return(
        <li className={`w-[80%] h-[30px] p-3 mt-4 bg-slate-100 shadow-lg shadow-slate-400 flex justify-between items-center rounded-sm ease-out duration-300 sm:w-[70%] sm:h-[30px] lg:w-[80%] lg:h-[43px] lg:p-5 lg:mt-5 lg:rounded-md xl:w-[60%] xl:h-[45px] xl:p-5 xl:mt-5 ${todoDetails.edit && "h-[45px] bg-slate-300 pr-4 pl-4 shadow-md shadow-slate-400 sm:h-[50px] sm:pr-5 sm:pl-5 lg:h-[60px] lg:pr-7 lg:pl-7 xl:w-[60%] xl:h-[60px] xl:text-[25px] xl:pr-8 xl:pl-7"} linear-animation ${deleteTodoAnimation}`} >
            {
                todoDetails.edit ?(
                    <>
                        <input type='text' value={input}  onChange={(e)=>setInput(e.target.value)} className='ease-out duration-300 text-[18px] w-[50%] h-[27px] pl-1 font-semibold border-none outline-none bg-white rounded-sm sm:w-[50%] sm:h-[30px] sm:text-[18px] sm:pl-2  lg:text-[24px] lg:w-[60%] lg:h-[40px] lg:pl-3 xl:text-[23px] xl:w-[400px] xl:h-[37px] xl:pl-3 2xl:rounded-md' autoFocus/>
                        <div className='flex items-center'>
                            <button className="ease-out duration-30 text-[22px] h-[25px] w-[25px] text-green-800 font-semibold flex justify-center items-center rounded mr-5 sm:h-[28px] sm:w-[28px] sm:mr-6  md:mr-9 lg:h-[33px] lg:w-[33px] lg:text-[28px] lg:font-semibold lg:mr-8 xl:text-white xl:h-[33px] xl:w-[33px] xl:text-[26px] xl:font-semibold xl:bg-green-500 xl:mr-10 2xl:mr-10"  onClick={()=>dispatch(updateTodosToServer({id:todoDetails.id,todoText:input,edit:false}))}>
                                <TiTick className='ease-out duration-300'/>
                            </button>
                            <button className="ease-out duration-300 text-[13px] text-red-800 font-semibold h-[25px] w-[25px] flex justify-center items-center rounded sm:h-[28px] sm:w-[28px] lg:w-[33px] lg:text-[16px] lg:font-semibold xl:bg-red-600 xl:text-white xl:h-[33px] xl:w-[33px] xl:text-[14px]" onClick={UpdatationCancel}>
                                <ImCross className='ease-out duration-300'/>
                            </button>
                        </div>
                    </>
                ):(
                    <>
                        <p className="text-[16px] font-semibold text-black ease-out duration-300 sm:text-[15px] lg:text-[20px]">{todoDetails.todoText}</p>
                        <div className='flex  items-center'>
                            <button className="ease-out duration-300  font-extrabold text-[16px] text-green-800 h-[22px] w-[22px] flex justify-center items-center rounded mr-5 sm:h-[25px] sm:w-[25px] sm:mr-6 lg:text-[20px] xl:text-[16px] xl:h-[30px] xl:w-[30px] xl:bg-green-500 xl:text-white 2xl:mr-8"  onClick={()=>dispatch(editTodo(todoDetails.id))}>
                                <BiSolidEditAlt className='ease-out duration-300'/>
                            </button>
                            <button className="ease-out duration-300 font-extrabold  text-[16px] text-red-800 h-[22px] w-[22px] flex justify-center items-center rounded sm:h-[25px] sm:w-[25px] lg:text-[20px] lg:h-[28px] lg:w-[28px] xl:text-[16px] xl:h-[30px] xl:w-[30px] xl:bg-red-600 xl:text-white" onClick={deletingTodo}>
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