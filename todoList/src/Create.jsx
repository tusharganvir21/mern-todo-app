import { useState } from 'react';
import axios from 'axios';

function Create( {onTaskAdded} ) {
    const [task, setTask] = useState('');

    const handleAdd = () => {
      if(!task.trim()) return;

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/add`, {task: task})
        .then(result => {
          // location.reload()   
           onTaskAdded(result.data);
           setTask('');
        })
        .catch(err => console.log(err))
    };
  return (
    <div className='create-form'>
        <input 
          type="text" 
          placeholder='Enter Task' 
          value={task} 
          onChange={(e)=> setTask(e.target.value)} 
        />
        <button type="button" onClick={handleAdd} >Add</button>
    </div>
  )
}

export default Create