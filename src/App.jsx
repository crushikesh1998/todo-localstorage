import React, { useEffect, useState } from 'react';
import { TodoContextProvider } from './contexts';
import  styles from './app.module.scss'
import TodoForm from './components/TodoForm';
import TodoItems from './components/TodoItems';
const App = () => {
  const[todos,setTodos] =useState([]);

  const addTodo= (todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev])
  } 
  const updateTodo=(id,todo)=>{
    setTodos((prev)=> prev.map((prevTodo)=>(prevTodo.id === id ? todo : prevTodo )))
  }

  const deleteTodo = (id) =>{
    setTodos((prev)=>prev.filter((todo)=> todo.id !== id ))
  }

  const toggleComplete = (id) =>{
    
    setTodos((prev)=>prev.map((prevTodo)=> prevTodo.id ===id ?  {...prevTodo, completed:!prevTodo.completed }:prevTodo))
  }

  useEffect(()=>{
  const todos =  JSON.parse(localStorage.getItem("todos"))
  if(todos && todos.length >0){
    setTodos(todos)
  }    
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])




  return (
    <TodoContextProvider value={{todos,addTodo,deleteTodo,updateTodo,toggleComplete}}>
      <div className={styles.container}>
        <div>
          <h1 cla>manage Your todo</h1>
        </div>
        <section >
        <TodoForm/>
        <div>
          {
            todos.map((todo)=>(
              <div key={todo.id}>
                <TodoItems todo={todo}/>

              </div>
            ))
          }
        </div>
        </section>
      </div>
    </TodoContextProvider>
  );
}

export default App;
