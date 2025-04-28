import React, { useState } from 'react';
import styles from '../styles/TodoForm.module.scss'
import { useTodo } from '../contexts';

const TodoForm = () => {
  const [todo,setTodo] = useState("")
  const {addTodo} =useTodo()

  const add = (e) =>{
    e.preventDefault()
    if(!todo) return

    addTodo({todo,completed:false})
    setTodo("")
  }
  return (
    <form 
    className={styles.form__container}
    onSubmit={add}
    >
        <input 
        type="text"
        value={todo}
        onChange={(e)=>setTodo(e.target.value)}
        />
        <button type='submit'>add</button>
    </form>
  );
}

export default TodoForm;
