import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios';
import { BsFillCheckCircleFill, BsCircleFill, BsFillTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err)
      )
    },[]);

    const handleEdit = (id) => {
      axios.put('http://localhost:3001/update/'+id)
      .then(result => {
        // location.reload()
        setTodos(prevTodos =>
          prevTodos.map(todo => 
            todo._id === id ? {...todo, done: !todo.done} : todo
          )
        );
      })
      .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
      axios.delete('http://localhost:3001/delete/'+id)
      .then(result => {
        // location.reload()
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      })
      .catch(err => console.log(err))
    }

    return (
    <>
      <div className="home">
        <h2 className='heading'>Todo List</h2>
        <Create onTaskAdded={(newTask) => setTodos((prevTodos) => [...prevTodos, newTask])} /> 
        {
          todos.length === 0
          ? <div><h2 className='no-record'>No Records</h2></div>
          : todos.map((todo, index) => (
              <div className='task' key={index}>
                <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                  {todo.done 
                  ? <BsFillCheckCircleFill className="icon"/>
                  : <BsCircleFill className="icon" />
                  }
                  <p className={todo.done ? 'line-through' : ''}>{todo.task}</p>
                </div>
                <div>
                  <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)}/></span>
                </div>
              </div>
          ))
        }
      </div>
        <footer className="footer">
          <p>Created by <span className="footer-name">Tushar Ganvir</span></p>
        </footer>
    </>
  )
}

export default Home