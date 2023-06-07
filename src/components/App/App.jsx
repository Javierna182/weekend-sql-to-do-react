import React from 'react';
// import {useState} from 'react';
import { useEffect, useState } from 'react';
import './App.css';

import  Header  from '../Header/Header.jsx';



function App () {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    console.log('Fetching Tasks!');
    getTask().then(task => setTaskList(task));
  }, []);

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
  }//end delete

  const handleSubmit = (event) => {
    console.log({event});
    event.preventDefault();

    addTask({ task: task}).then(() => {
      getTask().then(setTaskList);
    });

    setTask('');
  };// used to submit button 

  const updateTask = (event) => {
    setTask(event.target.value);
  };// to update the task

  return (
    <div className="App">
      <Header/>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Task">Task:</label>
        <input type="text" placeholder='Add New Task' value={task} onChange={updateTask} />
        <button type="submit">Add New Task</button>
      </form>
    <h2>Task List</h2>
    <main>
      <ul>
        {taskList && taskList.map(task => (
          <li key={task.id}>
            {task.task}
            <button type="button" onClick={() => deleteTask(task.id)}>delete</button>
            <button>edit</button>
            <button>completed</button>
          </li>
        ))}
      </ul>
    </main>
    </div>
  );

}

export default App


// {task.completed ? <div class=“completed”>DONE</div> : <div class=“not completed”>NOT DONE</div> }