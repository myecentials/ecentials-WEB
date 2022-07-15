import React from 'react'
import { BrowserRouter, Route, Routes,  } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import Error from '../pages/Error'

const Config = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='signup' element={<Signup/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='home' element={<Home/>}/>
            <Route path='*' element={<Error/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Config