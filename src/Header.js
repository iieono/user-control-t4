import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./logo.png";
import { useSelector, useDispatch } from 'react-redux'
import { changeEng, changeUz} from "./features/theme/themeSlice";
import { setUser } from "./features/auth/authSlice";
import { ThemeContext } from "./App";
import axios from "axios";
import { toast } from "react-toastify";


export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {language, langPack} = useSelector((state) => state.theme)
  const {user} = useSelector((state) => state.auth)
  const {password} = useSelector((state) => state.auth)
  const [languageL, setLanguageL] = useState(language)
  const [themeContext, setThemeContext] = useContext(ThemeContext)
  const [all, setAll]= useState([])
  const [searchI, setSearchI] = useState('')
  const [result, setResult] = useState([])
  useEffect(()=>{
    if(user && !user.is_active){
      navigate('/login')
      localStorage.removeItem('user')
      dispatch(setUser(null))
    }
  },[user])
  useEffect(()=>{
    if(user){
      const interval = setInterval(() => {
      getData()
    }, 2000);
    return () => clearInterval(interval);
    }
  },[user])
  useEffect(()=>{
    setSearchI('')
  }, [window.location.href])

  const BASE_URL = 'http://localhost:8000'
  const getData = async () =>{
    if(!user){
      return
    }

    const body = {
      email : user.email,
      password : password,
    }

    try{
      const response = await axios.post(`${BASE_URL}/api/user/login`, body)
      if(response.data){
        if(!Boolean(response.data.is_active)){
          toast.error('You have been blocked')
          localStorage.removeItem('user')
          dispatch(setUser(null))
          window.location.reload()
          return 
        
        }
        localStorage.setItem('user', JSON.stringify(response.data))
        dispatch(setUser(response.data))
      }
    }catch(err){
      console.log(err)
      localStorage.removeItem('user')
      dispatch(setUser(null))

    }

  }
  const changeLanguage = (e, lang) =>{
    e.preventDefault()
    if(lang === 'uz'){
      dispatch(changeUz)
      localStorage.setItem('language', lang)
      setLanguageL(lang)
    } else if(lang === 'eng'){
      dispatch(changeEng)
      localStorage.setItem('language', lang)
      setLanguageL(lang)
    } else{
      console.log(lang)
    }
    window.location.reload()

  }
  const handleTheme = (e) =>{
    e.preventDefault()
    localStorage.setItem('theme', themeContext == 'light' ? 'dark' : 'light')
    setThemeContext(themeContext === 'light' ? 'dark' : 'light')
  }
  return (
    <nav className={`navbar flex-column flex-sm-row container-fluid flex-wrap shadow ${themeContext === 'light' ? 'bg-light text-dark' : 'bg-dark text-light border-bottom-light'} mb-4 p-1 `}>
      <div className="col-6 ps-sm-3">
        <Link to="/">
          <h3>Users</h3>
        </Link>
      </div>
      <div className="d-flex col-6 d-flex justify-content-end pe-3">
          <div>
            <Link to={`/${user ? '' : 'login'}`}>
            <button className="btn btn-outline-success">{
              user && user ? (
                <i class={`fa-solid fa-arrow-right-to-bracket ${themeContext === 'dark' ? 'text-light' : 'text-dark'}`} ></i>
                ) : (
                <i class={`fa-solid fa-arrow-right-to-bracket ${themeContext === 'dark' ? 'text-light' : 'text-dark'}`}></i>
              )
            }
            </button>
            </Link>
        </div>
      </div>
    </nav>
  );
}
