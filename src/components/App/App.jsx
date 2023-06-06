import React from 'react';
// import {useState} from 'react';
import { useEffect, useState } from 'react';
import './App.css';

function getTask(){
  return fetch('/todo.router')
  .then(response => response.json())
  .catch((error) => {
    console.log(error);
  });
}

function addTask(task){
  return fetch('/todo.router', {
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
}

function App () {
  const [taskList, setTaskList] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    console.log('Fetching Tasks!');
    getTask().then(task => setTaskList(task));
  }, []);

  //add function addTask

  const handleSubmit = (event) => {
    console.log({event});
    event.preventDefault();

    addTask({ task: task}).then(() => {
      getTask().then(setTaskList);
    });

    setTask('');
  };
  
  
  return (
    <div>
      <h1>TO DO APP</h1>
    </div>
  );

}

export default App
