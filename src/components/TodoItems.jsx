import React, { useState } from 'react';
import style from '../styles/TodoItems.module.scss'
import { useTodo } from '../contexts';
const TodoItems = ({todo}) => {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg ,setTodoMsg] = useState(todo.todo)
    const { updateTodo, deleteTodo, toggleComplete } = useTodo()


    const editTodo = ()=>{
        updateTodo(todo.id,{...todo,todo:todoMsg})
        setIsTodoEditable(false)
    }

    const toggleCompleted = () =>{
        toggleComplete(todo.id)
    }
    return (
        <>
            <div className={style.items__container}>
                <div className={style.items__checkbox}>
                    <input
                        type="checkbox"
                        checked = {todo.completed}
                        onChange={toggleCompleted}
                    />
                    <input 
                    type="text"
                    value={todoMsg}
                    onChange={(e)=>setTodoMsg(e.target.value)}
                    readOnly={!isTodoEditable}
                    />
                </div>
                <div className={style.items__actions}>
                    <button
                    onClick={()=>{
                        if(todo.completed) return ;

                        if(isTodoEditable){
                            editTodo()
                        }else setIsTodoEditable((prev) =>!prev)

                    }}     
                    disabled={todo.completed}               
                    >{isTodoEditable ? 'add' : 'edit'}</button>
                    <button
                    onClick={()=>deleteTodo(todo.id)}
                    >delete</button>
                </div>
            </div>

        </>
    );
}

export default TodoItems;
