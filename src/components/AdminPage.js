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
    const [users, setUsers] = useState([])
    const [selected, setSelected] = useState([])
    const [allSelected, setAllSelected] = useState(false)
    console.log('selected', allSelected)

    const BASE_URL = 'https://user-control-t4.herokuapp.com'
    useEffect(()=>{
      if(selected.length === users.length){
        setAllSelected(true)
      }else{
        setAllSelected(false)
      }
    }, [selected])
    useEffect(()=>{
      if(!user){
        navigate('/login')
      }
    }, [user])
    useEffect(()=>{
        getUsers()
    },[])
    setAllSelected(false)

    const getUsers = async () =>{
        const response = await axios.get(`${BASE_URL}/api/get/users`)
        if(response.data){
            setUsers(response.data)
        }

    }
    const unblockUsers = async()=>{
      if(selected.length === 0) {
        return
      }
      if(allSelected){
        try{
          const responseAll = await axios.post(`${BASE_URL}/api/unblock`, {
            Headers : {
              "Authorization" : `Bearer ${user.token}`
            }
          })
        }catch(err){
          console.log(err)
        }
        return
      }
      try{
        for(let i = 0; i < selected.length; i++){
          const response = await axios.post(`${BASE_URL}/api/unblock/${selected[i]}`, {
            Headers :{
              "Authorization" : `Bearer ${user.token}`
            }
          })
        }
        window.location.reload()

      }catch(err){
        console.log(err)
      }
      
    }
    const blockUsers = async()=>{
      if(selected.length === 0) {
        return
      }
      if(allSelected){
        try{
          const responseAll = await axios.post(`${BASE_URL}/api/block`, {
            Headers :{
              "Authorization" : `Bearer ${user.token}`
            }
          })
        }catch(err){
          console.log(err)
        }
        return
      }
      try{
        for(let i = 0; i < selected.length; i++){
          const response = await axios.post(`${BASE_URL}/api/block/${selected[i]}`, {
            Headers :{
              "Authorization" : `Bearer ${user.token}`
            }
          })
        }
        window.location.reload()

      }catch(err){
        console.log(err)
      }
      
    }
    const deleteUsers = async()=>{
      if(selected.length === 0) {
        return
      }
      if(allSelected){
        try{
          const responseAll = await axios.delete(`${BASE_URL}/api/all`, {
            Headers :{
              "Authorization" : `Bearer ${user.token}`
            }
          })
          if(responseAll.allSelected){
            window.location.reload()
          }
        }catch(err){
          console.log(err)
        }
        return
      }
      try{
        for(let i = 0; i < selected.length; i++){
          const response = await axios.delete(`${BASE_URL}/api/delete/${selected[i]}`, {
            Headers :{
              "Authorization" : `Bearer ${user.token}`
            }
          })
        }
        window.location.reload()

      }catch(err){
        console.log(err)
      }

    }
    const selectHandle = async()=>{
      if(selected.length > 0){
        setSelected([])
        setAllSelected(false)
      }else{
        setSelected([...users.map((user) => user.id)])
        setAllSelected(true)
      }

    }
  return (
    <div className={`${themeContext === 'light' ? '' : 'text-light'}`}>
      <div className="container-fluid rounded shadow col-11 p-2">
        <div  className="border border-primary rounded p-1 shadow d-flex justify-content-between">
          <div className="form-control-checkbox d-flex align-items-center gap-3">
            <input type='checkbox' value={allSelected} onClick={selectHandle} checked={allSelected}/>
            <h5
              class="m-0">
              Users
            </h5>
          </div>
          <div className="d-flex gap-2">
          <button className="btn btn-sm btn-danger" onClick={blockUsers}>
            <i class="fa-solid fa-lock"></i>
          </button>
          <button className="btn btn-sm btn-success" onClick={unblockUsers}>
            <i class="fa-solid fa-unlock"></i>
          </button>
          <button className="btn btn-sm btn-danger" onClick={deleteUsers}>
            <i class="fa-solid fa-trash-can"></i>
          </button>
          </div>
        </div>
        <div>
            {users && users.map((user) => <User userL={user} selected={selected} setSelected={setSelected} />)}
        </div>
      </div>
    </div>
  );
}

function User({ userL, setSelected, selected }) {
    const { user } = useSelector((state)=> state.auth)
    const [themeContext] = useContext(ThemeContext)
    const [userSelected, setUserSelected] = useState(selected.includes(userL.id))
    useEffect(()=>{
      setUserSelected(selected.includes(userL.id))
    }, [selected])

    // const toggleStatus = async() =>{
    //     const body = {
    //         id : userL.id,
    //         is_active : userL.is_active
    //     }
    //     const response = await axios.post(`${BASE_URL}/api/status`, body, {
    //         headers :{
    //             'Authorization' : `Bearer ${user.token}`
    //         }
    //     })
    //     if(response.data){
    //       if(userL.id === user.id && userL.is_active){
    //         dispatch(setUser(null))
    //         localStorage.removeItem('user')
    //         navigate('/login')
    //       }
    //     }
    //     window.location.reload()

    // }
    // const deleteUser = async()=>{
    //   try{
    //     const response = await axios.delete(`${BASE_URL}/api/${userL.id}`, {
    //       headers :{
    //         'Authorization' : `Bearer ${user.token}`
    //       }
    //     })
    //     if(response.data){
    //       if(user.id === userL.id){
    //         dispatch(setUser(null))
    //         localStorage.removeItem('user')
    //         navigate('/login')
    //       }
    //       window.location.reload()
    //     }
    //   }catch(err){
    //     toast.error('Error occurred')

    //   }
      
    // }
    const selectHandle = ()=>{
      if(userSelected){
        setSelected(state => [...state.filter(user => !user.id === userL.id)])
      }else{
        console.log('add')
        setSelected([...selected, userL.id])
      }
    }

  return (
    <div className={`${themeContext === 'light' ? '' : 'text-light'} d-flex p-2 flex-column flex-sm-row rounded border-bottom border-primary justify-content-between align-items-center`}>
        <div className="d-flex col-12 gap-1 align-items-center justify-content-between">
          <input type='checkbox' value={userSelected} onClick={selectHandle} checked={userSelected}/>
          <div className="col-1">
            ID:<strong> {userL.id}</strong>
          </div>
          <div className="col-1">
            Name:
            <strong className="text-break"> {userL.name }</strong>
          </div>
          <div className="col-2">
            <strong className="text-break"> {userL.email}</strong>
          </div>
          <div className="col-3">
            <p className="m-0">Last seen:</p>
            <strong className="text-break"> {userL.last_online.substring(0, 10) + ':' + userL.last_online.substring(11, 16) }</strong>
          </div>
          <div className="col-3">
          <p className="m-0">Registered:</p>
            <strong className="text-break"> {userL.registered.substring(0, 10) + ':' + userL.registered.substring(11, 16) }</strong>
          </div>
        <div className="col-1 text-center">
          {userL.is_active ? (
            <div className="bg-success p-1 text-light rounded">
              <strong>Active</strong>
            </div>
          ) : (
            <div className="bg-danger p-1 text-light rounded">
              <strong>Blocked</strong>
            </div>
          )}
        </div>
        </div>
    </div>
  );
}

