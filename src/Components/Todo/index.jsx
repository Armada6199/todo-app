import React, { useContext, useEffect, useState } from 'react';
import useForm from '../../hooks/form';

// import { v4 as uuid } from 'uuid';
import { settingsProvider } from '../../context/settings/settings';
import './todo.scss'

const Todo = () => {
  const context = useContext(settingsProvider)

  const [defaultValues] = useState({
    difficulty: 4,
  });
  // const [list, setList] = useState([]);
  // const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(context.addItem, defaultValues);

  // function addItem(item) {
  //   item.id = uuid();
  //   item.complete = false;
  //   console.log(item);
  //   setList([...list, item]);
  // }

  // function deleteItem(id) {
  //   const items = list.filter( item => item.id !== id );
  //   setList(items);
  // }

  // function toggleComplete(id) {

  //   const items = list.map( item => {
  //     if ( item.id === id ) {
  //       item.complete = ! item.complete;
  //     }
  //     return item;
  //   });

  //   setList(items);
  // }

  useEffect(() => {
    let incompleteCount = context.state.filter(item => !item.completed).length;
    let incompleteHide = context.state.filter(item => item.completed);
    console.log(incompleteHide);
    context.setIncomplete(incompleteCount);
    document.title = `To Do List: ${context.incomplete}`;

  }, [context.state]);  

  return (
    <>
      {/* <header data-testid="todo-header">
        <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      </header> */}

      <form onSubmit={handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>

      {/* {list.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))} */}

    </>
  );
};

export default Todo;
