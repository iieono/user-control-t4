import React, { useContext, useState } from "react";
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './Header'
import Register from './components/Register'
import Login from './components/Login'
import AdminPage from './components/AdminPage'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export const ThemeContext = React.createContext(null);

function App() {
  const [themeContext, setThemeContext] = useState(localStorage.getItem("theme") || 'light');
  return (
    <>
    <ThemeContext.Provider value={[themeContext, setThemeContext]} >
      <Router>
        <div className={`${themeContext === 'dark' ? 'bg-dark' : 'bg-light'} cont-full`}>
          <Header />
          <Routes>
            <Route path='/' element={<AdminPage />} />
            <Route path='/login'  element={<Login />} />
            <Route path='/register'  element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </ThemeContext.Provider>
    </>
  );
}

export default App;
