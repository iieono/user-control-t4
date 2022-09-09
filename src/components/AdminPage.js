import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux'
import { setUser } from '../features/auth/authSlice'
import axios from 'axios'
import {toast} from 'react-toastify'
import { ThemeContext } from "../App";

export default function AdminPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [themeContext] = useContext(ThemeContext)
    const { user } = useSelector((state)=> state.auth)
    const { langPack} = useSelector((state)=> state.theme)
    const [admins, setAdmins] = useState([])
    const [users, setUsers] = useState([])
    useEffect(()=>{
        if(!user || !user.is_admin){
          navigate('/')
        }
      },[ user ])

    const BASE_URL = 'https://user-control-t4.herokuapp.com'
    useEffect(()=>{
        getAdmins()
        getUsers()
    },[])
    const getAdmins = async () =>{
        const response = await axios.get(`${BASE_URL}/api/users/admins`, {headers : {
            'Authorization' : `Bearer ${user.token}`
        }})
        if(response.data){
            setAdmins(response.data)
        }

    }
    const getUsers = async () =>{
        const response = await axios.get(`${BASE_URL}/api/users/users`, {headers : {
            'Authorization' : `Bearer ${user.token}`
        }})

        if(response.data){
            setUsers(response.data)
        }

    }
  return (
    <div className={`${themeContext === 'light' ? '' : 'text-light'}`}>
      <div className="container-fluid rounded shadow col-11 p-2">
        <div  className="border border-primary bg-primary rounded p-1 shadow">
          <h5
            class="h-5 m-0"
            data-bs-toggle="collapse"
            data-bs-target="#collapseAdmin"
            aria-expanded="false"
            aria-controls="collapseAdmin"
          >
            <i class="fa-solid fa-angles-down"></i> {langPack.admin.admins}
          </h5>
        </div>
        <div className="collapse show" id="collapseAdmin">
            {admins && admins.map((admin) => <User userL={admin} />)}
        </div>
      </div>
      <div className="container-fluid rounded shadow col-11 p-2">
        <div className="border border-primary bg-primary rounded p-1 shadow">
          <h5
            class="h-5 m-0"
            data-bs-toggle="collapse"
            data-bs-target="#collapseUser"
            aria-expanded="false"
            aria-controls="collapseUser"
          >
            <i class="fa-solid fa-angles-down"></i> {langPack.admin.users}
          </h5>
        </div>
        <div className="collapse show" id="collapseUser">
            {users && users.map((user) => <User userL={user} />)}
        </div>
      </div>
      
    </div>
  );
}

function User({ userL }) {
    const { user } = useSelector((state)=> state.auth)
    const [themeContext] = useContext(ThemeContext)
    const { langPack} = useSelector((state)=> state.theme)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const BASE_URL = 'https://user-control-t4.herokuapp.com'
    const toggleStatus = async() =>{
        const body = {
            id : userL.id,
            is_active : userL.is_active
        }
        const response = await axios.post(`${BASE_URL}/api/users/status`, body, {
            headers :{
                'Authorization' : `Bearer ${user.token}`
            }
        })
        if(response.data){
          if(userL.id === user.id && userL.is_active){
            dispatch(setUser(null))
            localStorage.removeItem('user')
            navigate('/login')
          }
        }
        window.location.reload()

    }
    const deleteUser = async()=>{
      try{
        const response = await axios.delete(`${BASE_URL}/api/users/${userL.id}`, {
          headers :{
            'Authorization' : `Bearer ${user.token}`
          }
        })
        if(response.data){
          if(user.id === userL.id){
            dispatch(setUser(null))
            localStorage.removeItem('user')
            navigate('/login')
          }
          window.location.reload()
        }
      }catch(err){
        toast.error('Error occurred')

      }
      
    }
    const toggleAdmin = async () =>{
        const body = {
            id : userL.id,
            is_admin : userL.is_admin
        }
        const response = await axios.post(`${BASE_URL}/api/users/set-admin`, body, {
            headers :{
                'Authorization' : `Bearer ${user.token}`
            }
        })
        if(response.data){
          if(user.id === userL.id){
            dispatch(setUser({...user, is_admin : false}))
            localStorage.setItem('user', JSON.stringify({...user, is_admin : false}))
          }
            window.location.reload()
        }
    }
  return (
    <div className={`${themeContext === 'light' ? '' : 'text-light'} d-flex p-2 flex-column flex-sm-row rounded border-bottom border-primary justify-content-between align-items-center`}>
      <div className="d-flex flex-column flex-md-row gap-1 col-12 col-sm-8 justify-content-between align-items-start align-items-md-center mb-1 mb-sm-0">
        <div className="d-flex gap-2 col-12 col-md-7 align-items-center">
          <div className="col-3 col-sm-3">
            ID:<strong> {userL.id}</strong>
          </div>
          <div className="col-9 col-sm-9">
            {userL.id === user.id ? langPack.admin.you : langPack.admin.name}:
            <strong className="text-break"> {userL.name }</strong>
          </div>
        </div>
        <div className="col-12 col-sm-5 justify-content-start">
            {langPack.admin.email}:
          <strong className="text-break"> {userL.email}</strong>
        </div>
      </div>
      <div className="d-flex gap-3 col-12 col-sm-4 justify-content-end align-items-center">
        <div>
          {userL.is_active ? (
            <div className="bg-success p-1 text-light rounded">
              <strong>{langPack.admin.isActive}</strong>
            </div>
          ) : (
            <div className="bg-danger p-1 text-light rounded">
              <strong>{langPack.admin.isBlocked}</strong>
            </div>
          )}
        </div>
        <div >
        <Link to={`/user/${userL.id}`}>
        <button className="btn btn-sm btn-info">
          <i class="fa-solid fa-eye"></i>
        </button>
        </Link>
        </div>
          <button class="btn btn-sm btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-user-pen"></i>
          </button>
        <div className="dropdown-menu">
            {/* edit status */}
        <div className="dropdown-item">
        {userL.is_active ? (
          <button className="btn btn-sm btn-danger col-12 text-start" onClick={toggleStatus}>
            <i class="fa-solid fa-lock"></i> {langPack.admin.block}
          </button>
        ) : (
          <button className="btn btn-sm btn-success col-12 text-start" onClick={toggleStatus}>
            <i class="fa-solid fa-unlock"></i> {langPack.admin.unblock}
          </button>
        )}
        </div>
        {/* delete user */}
        <div className="dropdown-item">
        <button className="btn btn-sm btn-danger col-12 text-start" onClick={deleteUser}>
            <i class="fa-solid fa-trash-can"></i> {langPack.admin.delete}
          </button>
        </div>
          {/* admin change */}
        <div className="dropdown-item">
        {userL.is_admin ? (
          <button className="btn btn-sm btn-primary col-12 text-start" onClick={toggleAdmin}>
            <i class="fa-solid fa-user-minus"></i> {langPack.admin.removeAdmin}
          </button>
          
          ) : (
            <button className="btn btn-sm btn-primary col-12 text-start" onClick={toggleAdmin}>
            <i class="fa-solid fa-user-plus"></i> {langPack.admin.addAdmin}
          </button>
        )}
        </div>

        </div>
      </div>
    </div>
  );
}

