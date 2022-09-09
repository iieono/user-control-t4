import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setPassword } from '../features/auth/authSlice'
import { ThemeContext } from "../App";

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [themeContext] = useContext(ThemeContext)
  const { user } = useSelector((state)=> state.auth)
  const { langPack } = useSelector((state)=> state.theme)
  useEffect(()=>{
    if(user){
      navigate(`/`)
    }
  },[user])
  
  const [email, setEmail] = useState("");
  const [password, setPasswordd] = useState("");
  
  const BASE_URL = 'https://user-control-t4.herokuapp.com'
  const handleSubmit = async (e) =>{
    e.preventDefault()
    
    if(!email || !password){
      toast.error(langPack.register.notFilled)
      return
    }
    const body = {
      email : email,
      password : password,
    }

    try{
      const response = await axios.post(`${BASE_URL}/api/user/login`, body)
      if(response.data){
        if(!response.data.is_active){
          toast.error(langPack.register.isBlocked)
          return
        }
        localStorage.setItem('user', JSON.stringify(response.data))
        dispatch(setUser(response.data))
        console.log(response.data)
        localStorage.setItem('p', JSON.stringify(password))
        dispatch(setPassword(password))
      }
    }catch(err){
      toast.error(langPack.register.checkCredentials)
      console.log(err)

    }

  }

  return (
    <div>
      <section class="h-100">
        <div class="container h-100">
          <div class="row justify-content-sm-center h-100">
            <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div class="card shadow-lg border-0">
                <div class={`card-body ${themeContext === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                  <h1 class="fs-4 card-title fw-bold text-info text-center">
                  {langPack.register.login}
                  </h1>
                  <form autocomplete="off">
                    <div class="mb-3">
                      <label class="mb-2 text-muted" for="email">
                      {langPack.register.email}
                      </label>
                      <input
                        id="email"
                        type="email"
                        class="form-control"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div class="mb-3">
                      <label class="mb-2 text-muted" for="password">
                      {langPack.register.password}
                      </label>
                      <input
                        id="password"
                        type="password"
                        class="form-control"
                        name="password"
                        value={password}
                        onChange={(e) => setPasswordd(e.target.value)}
                      />
                    </div>

                    <div class="align-items-center mt-4 d-flex">
                      <button
                        type="submit"
                        class="col-12 btn btn-primary ms-auto"
                        onClick={(e) => handleSubmit(e)}
                      >
                        {langPack.register.login}
                      </button>
                    </div>
                  </form>
                </div>
                <div class={`card-footer py-3 border-0 ${themeContext === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                  <div class="text-center">
                  {langPack.register.notMember} <Link to="/register">{langPack.register.register}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
