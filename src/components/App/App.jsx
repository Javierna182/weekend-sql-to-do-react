import React from 'react';
// import {useState} from 'react';
import { useEffect, useState } from 'react';
import './App.css';

import  Header  from '../Header/Header.jsx';




function App () {
  const [taskList, setTaskList] = useState([]);
  const [taskCompleted, setTaskCompleted ] = useState(false);
  const [task, setTask] = useState('');

  useEffect(() => {
    console.log('Fetching Tasks!');
    getTask().then(task => setTaskList(task));
  }, []);// end useEffect

  //add function addTask
  function getTask(){
    return fetch('/todo')
    .then(response => response.json())
    .catch((error) => {
      console.log(error);
    });
  }//end getTask
  
  function addTask(task){
    return fetch('/todo', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      if (response.status !== 201) {
        throw new Error('Bad status!');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }//end addTask
  
  function deleteTask(id){
    return fetch(`/todo/${id}`, {
      method: 'DELETE'
    })
    .then((response) => {
      console.log(response);
      getTask().then(task => setTaskList(task));
    })
    .catch((error) => {
      console.error(error);
    });
  }//end deleteTask

  function completeTask(id){
    return fetch(`/todo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      console.log(response);
      getTask().then(task => setTaskList(task));
    })
    .catch((error) => {
      console.error(error);
    });
  }//end completeTask

  const handleSubmit = (event) => {
    console.log({event});
    event.preventDefault();

    addTask({ task: task, taskCompleted: taskCompleted}).then(() => {
      getTask().then(setTaskList);
    });

    setTask('');
    setTaskCompleted('');
  };// used to submit button 

  const updateTask = (event) => {
    setTask(event.target.value);
  };// to update the task

  const udpateCompletedTask = (event) => {
    setTaskCompleted(event.target.value);
  };//to update completedTask

  return (
    
    <div className="AppBody">
      <Header/>
      <form onSubmit={handleSubmit}>
        <label className="TaskLab" htmlFor="Task">Task:</label>
        <input className='inputAdd' type="text" placeholder='Add New Task' value={task} onChange={updateTask} />
        <button  className='submitBtn' type="submit">Submit</button>
      </form>
    <h2 className='h2Text'>Task List</h2>
    <main>
      <ul>
        {taskList && taskList.map(task => (
          <div className='listDiv' key={task.id}>
            <div className={task.completed ? 'completed' : null}>{task.task}</div>
            {/* {task.completed ? <div className='completed'>DONE</div> : <div class='notCompleted'>NOT DONE</div> } */}
            <button className='deleteBtn' type="button" onClick={() => deleteTask(task.id)}>Delete</button>
            <button className='completeBtn' type="button" onClick={() => completeTask(task.id)}>Complete</button>
            {/* <button type="button" onClick={() => completdTask(task.id)}>completed</button> */}
          </div>
        ))}
      </ul>
    </main>
    </div>
    
  );

}

export default App

{/* <div className={task.status ? 'completed' : null}>{task.task}</div> */}
// {task.completed ? <div class=“completed”>DONE</div> : <div class=“not completed”>NOT DONE</div> }