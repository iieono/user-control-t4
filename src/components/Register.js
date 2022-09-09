import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux'
import { setUser } from '../features/auth/authSlice'
import axios from 'axios'
import {toast} from 'react-toastify'
import { ThemeContext } from "../App";

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [themeContext] = useContext(ThemeContext)
  const { user } = useSelector((state)=> state.auth)
  const { langPack} = useSelector((state)=> state.theme)
  useEffect(()=>{
    if(user){
      navigate('/')
    }
  },[user])
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  
  const BASE_URL = 'https://user-control-t4.herokuapp.com'
  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(!name || !email || !password || !rePassword){
      toast.error('Please fill all the fields')
      return
    }
    if(password != rePassword){
      toast.error('Password does not match')
      return
    }

    const body = {
      name : name,
      email : email,
      password : password,
    }
    try{
      const response = await axios.post(`${BASE_URL}/api/register`, body)
      console.log(response)
      if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
        dispatch(setUser(response.data))
        navigate('/')
      }
    }catch(err){
      toast.error('User already exists')
    }

  }
  return (
    <div>
      <section class="h-100 ">
        <div class="container h-100">
          <div class="row justify-content-sm-center h-100">
            <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div class="card shadow-lg border-0">
                <div class={`card-body ${themeContext === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                  <h1 class="fs-4 card-title fw-bold text-info text-center">
                  {langPack.register.register}
                  </h1>
                  <form autocomplete="off">
                    <div class="mb-3">
                      <label class="mb-2 text-muted" for="name">
                        {langPack.register.name}
                      </label>
                      <input
                        id="name"
                        type="text"
                        class="form-control"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

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
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div class="mb-3">
                      <label class="mb-2 text-muted" for="repassword">
                      {langPack.register.rePassword}
                      </label>
                      <input
                        id="repassword"
                        type="password"
                        class="form-control"
                        name="repassword"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                      />
                    </div>

                    <p class="form-text text-muted mb-3">
                    {langPack.register.agreement}
                    </p>

                    <div class="align-items-center d-flex">
                      <button
                        type="submit"
                        class="col-12 btn btn-primary ms-auto"
                        onClick={(e) => handleSubmit(e)}
                      >
                        {langPack.register.register}
                      </button>
                    </div>
                  </form>
                </div>
                <div class={`card-footer py-3 border-0 ${themeContext === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                  <div class="text-center">
                  {langPack.register.haveAnAccount} <Link to="/login">{langPack.register.login}</Link>
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
