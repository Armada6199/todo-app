import React, { useContext } from 'react'
import { settingsProvider } from '../../context/settings/settings'



export default function Header() {
     const context = useContext(settingsProvider)

  return (
       <>
           <header data-testid="todo-header">
                 <h1 data-testid="todo-h1">To Do List: {context.incomplete} items pending</h1>
          </header>
       </>
  )
}
