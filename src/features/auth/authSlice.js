import {createSlice} from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('user'))
const p = JSON.parse(localStorage.getItem('p'))

const initialState = {
    user : user ? user : null,
    password : p  ? p : null
}


export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers :{
        reset: (state) =>{
            state.message = ''
        },
        setUser : (state, action) =>{
            state.user = action.payload
        },
        setPassword : (state, action) =>{
            state.password = action.payload
        }

    }
})

export const { setUser, setPassword } = authSlice.actions 
export default authSlice.reducer