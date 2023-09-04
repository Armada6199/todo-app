import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';


export const settingsProvider = React.createContext()

export default function Settings(props) {
     let id = 0

     const [state, setState] = useState([
           {
               text: 'text 1',
               completed: false,
               assignee : '',
               difficulty: 0,
               id : id++
          },
           {
               text : 'text 2',
               completed: false,
               assignee : '',
               difficulty: 0,
               id : id++
          },
           {
               text : 'text 3',
               completed: false,
               assignee : '',
               difficulty: 0,
               id : id++
          }
     ])
     const [final, setFinal] = useState(state.slice(0, 3))
     const [incomplete, setIncomplete] = useState([]);

     
     function toggleComplete(id) {

          const items = state.map( item => {
            if ( item.id === id ) {
              item.completed = ! item.completed;
            }
            return item;
          });
      
          setState(items);
     }

     function change(number) {
          if (number === 1) {
               setFinal(state.slice(0, 3))
          }
          else {
               let sec_index = number * 3
               let first_index  = sec_index - 3

               setFinal(state.slice(first_index, sec_index))
          }
     }

     function addItem(item) {
          item.id = uuid();
          item.completed = false;
          console.log(item);
          setState([...state, item]);
     }

     function deleteItem(id) {
          const items = state.filter( item => item.id !== id );
          setState(items);
     }


  return (
     <settingsProvider.Provider value={{final , change ,toggleComplete ,state , addItem , deleteItem , incomplete ,setIncomplete}}>
          {props.children}
    </settingsProvider.Provider>
  )
}
