import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SettingPage from './pages/SettingsPage/Settings';
import Todo from './pages/SettingsPage/toDos';
import AppHeader from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import './App.scss'
import Settings from './Components/Context/Settings/Settings';
import ListsSaver from './Components/Context/ListOfData/ListOfData';

export default function App() {

  return (
    <BrowserRouter>
      <Settings>
        <ListsSaver>
          <AppHeader />
          <Routes>
            <Route path='/' element={<Todo />} />
            <Route path='/settings' element={<SettingPage />} />
          </Routes>
          <Footer />
        </ListsSaver>
      </Settings>
    </BrowserRouter>
  );
}

