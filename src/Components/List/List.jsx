import React, { useContext } from 'react'
import { settingsProvider } from '../../context/settings/settings'


export default function List() {

  const list = useContext(settingsProvider)

  
  return (
    <div data-testid = "contianer">
      {list.final.map(item => {

        if (item.completed === true) {
          return (  
          <div data-testid ="item-cont" className='hide'  key={item.id}>
            <p>{item.text}</p>
            <p><small>Assigned to: {item.assignee}</small></p>
            <p><small>Difficulty: {item.difficulty}</small></p>
            <div onClick={() => list.toggleComplete(item.id)}>Complete: {item.completed.toString()}</div>
            <hr />
          </div>
            )
        }
        
          return (  
          <div data-testid ="item-cont"  key={item.id}>
            <p>{item.text}</p>
            <p><small>Assigned to: {item.assignee}</small></p>
            <p><small>Difficulty: {item.difficulty}</small></p>
            <div onClick={() => list.toggleComplete(item.id)}>Complete: {item.completed.toString()}</div>
            <hr />
          </div>
            )
      })}
      
    </div>
  )
}
