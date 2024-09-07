import React, {useContext, useEffect} from 'react'

import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'

import {findWeekIdxOfPPMonthMatrix, getMonthMatrix, getPPMonthMatrix, getRelativeMonthIndex} from "./scheduler/util.ts";
import GlobalContext from './scheduler/context/GlobalContext.ts';
import MainPage from "./routes/Scheduler.tsx";
import dayjs from 'dayjs';
import { payPeriod } from './scheduler/GlobalVar.ts';




function App() {

  const {isDragging,
    setMonthIndex,
    daySelected,setDaySelected,
    setPPMonthMatrix,
    setWeekIndex,
  } = useContext(GlobalContext);
  const location = useLocation();

  // global init useEffect
  useEffect(()=>{
    setMonthIndex(dayjs().month());
    setDaySelected(dayjs());
    setPPMonthMatrix(getPPMonthMatrix(dayjs().month(),payPeriod));
    setWeekIndex(findWeekIdxOfPPMonthMatrix(getPPMonthMatrix(dayjs().month(), payPeriod)));
  },[]);

  useEffect(()=>{
    console.log("global daySelected:", daySelected);
    setMonthIndex((getRelativeMonthIndex(daySelected)));
  },[daySelected]);

  useEffect(()=>{
    console.log(location);
  },[location]);




  return (
    <>
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainPage/>} />


    </Routes>
    </>
  )
}

export default App
