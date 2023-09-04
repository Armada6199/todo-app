import React, { useContext } from 'react'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Settings from './context/settings/settings'
import List from './Components/List/List'
import Demo from './Components/Pagination/Pagination'
import Todo from './Components/Todo'

export default function Main() {

  return (
    <div>
     <Settings> 
        <Header />
        <Todo/>
        <List/>
        <Demo/>
        <Footer/>
     </Settings>
    </div>
  )
}
