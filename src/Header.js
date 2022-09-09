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

  const BASE_URL = 'https://user-collection-backend.herokuapp.com'
  const getData = async () =>{
    
    try{
      const responseAll = await axios.get(`${BASE_URL}/api/other/all/get`)
      if(responseAll.data){
        setAll(responseAll.data)
      }else{
        console.log('error occured')
      }

    }catch(err){
      console.log(err)
    }
    if(!user){
      return
    }

    const body = {
      email : user.email,
      password : password,
    }

    try{
      const response = await axios.post(`${BASE_URL}/api/users/login`, body)
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
  const searchHandle = ()=>{
    const navbar = document.querySelector('.navbar')
    navbar.style='position : fixed'
    setTimeout(()=>{
      navbar.style='position : relative'
    }, 5000)
    setResult(all.filter(item => item.name === searchI && window.find(searchI)))
  }
  console.log(result)

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
      <div className="col-sm-4 ps-sm-4">
        <Link to="/">
          <img src={Logo} alt="logo" className={`logo ${themeContext === 'dark' ? 'invert_effect' : ''}`} />
        </Link>
      </div>
      <div className="d-flex col-sm-8 d-flex justify-content-center">
        <div className="col-6 d-flex input-group input-group-search dropdown">
          <input type="text" className="form-control" placeholder={langPack.search} value={searchI} onChange={(e)=> setSearchI(e.target.value)}/>
          <button data-bs-toggle="dropdown" aria-expanded="false" className={`dropdown-toggle btn btn-outline-secondary ${themeContext === 'dark' ? 'text-light' : ''}`} onClick={searchHandle}>
            <i class="fa-solid fa-magnifying-glass-arrow-right"></i>
          </button>
          {result && (
            <ul className="dropdown-menu">
              {result.map((res)=> (
                <li className="dropdown-item col-12"><Link to={`/${res.type === 'item' ? 'item' : 'collection'}/${res.id}`} className='col-12'>{res.name}</Link></li>
                ))}
            </ul>
              )}
        </div>
        <div className="col-6 d-flex justify-content-end gap-1 pe-sm-4">
          <div className="dropdown-center ">
            <button
              className={`btn btn-outline-success ${themeContext === 'dark' ? 'text-light' : 'text-dark'}`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-solid fa-globe "></i>
            </button>
            <ul class="dropdown-menu p-0">
              <li>
                <button class={`btn dropdown-item ${languageL === 'eng' ? 'bg-info' : ''}`} onClick={(e => (changeLanguage(e, 'eng')))}>
                 English
                </button>
              </li>
              <li>
                <button class={`btn dropdown-item ${languageL === 'uz' ? 'bg-info' : ''}`} onClick={(e => (changeLanguage(e, 'uz')))}>
                  O`zbekcha
                </button>
              </li>
            </ul>
          </div>
          <div>
            <button className="btn btn-outline-success" onClick={handleTheme}>
              {
              themeContext === 'dark' ? (<i class="fa-solid fa-moon text-light"></i>) :
              (<i class="fa-solid fa-sun"></i>)
            }
            </button>
          </div>
          <div>
            <Link to={`/${user ? 'user/'+ user.id : 'login'}`}>
            <button className="btn btn-outline-success">{
              user && user ? (
                <i class={`fa-solid fa-user ${themeContext === 'dark' ? 'text-light' : 'text-dark'}`}></i>
                ) :(
                <i class={`fa-solid fa-arrow-right-to-bracket ${themeContext === 'dark' ? 'text-light' : 'text-dark'}`}></i>
              )
            }
            </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
