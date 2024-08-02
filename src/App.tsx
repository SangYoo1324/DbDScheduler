import React, {useEffect} from 'react'

import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import MainPage from './routes/MainPage.tsx'
import {getMonthMatrix} from "./scheduler/util.ts";




function App() {

  const location = useLocation();

  useEffect(()=>{
    console.log(location);
  },[location]);


  console.table(getMonthMatrix());

  return (
    <>
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage/>} />


    </Routes>
    </>
  )
}

export default App
