import React, { useContext, useEffect, useState } from 'react';
import logo from '../../assets/scheduler_logo.png'
import GlobalContext from '../../context/GlobalContext';
import EmployeePagination from '../../commonComponents/EmployeePagination';
import { ChevronLeft, ChevronRight, ClassSharp } from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';
import { findNthOfTheWeek, monthNames } from '../../util';
import { set } from 'react-hook-form';
function WeekCalendarHeader(props) {
   const {monthMatrix,monthIndex, setMonthIndex, daySelected, weekIndex, setWeekIndex, setSelectedWeekMatrix, selectedWeekMatrix} = useContext(GlobalContext);

   // set initial state of weekIndex
   useEffect(()=>{
    console.log('====================================');
    console.log(monthMatrix);
    console.log('====================================');
   

    setWeekIndex(findNthOfTheWeek(daySelected));
   
   },[]);


   useEffect(()=>{ 
    console.log("weekMatrix:", selectedWeekMatrix);
   },[selectedWeekMatrix])

   
   // If Week Inex changes, update the selectedWeekMatrix
   useEffect(()=>{
    console.log("WeekMatrix:", monthMatrix[weekIndex]);
    setSelectedWeekMatrix(monthMatrix[weekIndex]);
   }, [weekIndex, monthMatrix])



   // Reset the WeekIndex to today's week. 
   const handleReset = ()=>{
    setWeekIndex(findNthOfTheWeek(dayjs()));
    setMonthIndex(dayjs().month());
   }

   const handlePrevWeek = ()=>{
    if(weekIndex === 0) {
        setMonthIndex(monthIndex-1);
        if(selectedWeekMatrix[0].month() !== monthIndex){
            setWeekIndex(3);
        }else {
            setWeekIndex(4);
        }
    }else{
        setWeekIndex(weekIndex-1);
    }
    console.log("weekIndex:", weekIndex);
   }

   const handleNextWeek = ()=>{
    if(weekIndex === 4) {
        setMonthIndex(monthIndex+1);
       
        //if monthMatrix contains next month, set weekIndex to 1 because the first week of the next month will be same as the last week of the current month
        // if monthMatrix contains next month.
        if(selectedWeekMatrix[6].month() !== monthIndex){
            setWeekIndex(1);
        } 
        // if monthMatrix does not contain next month, set weekIndex to 0, because the first week of the next month will be
        // different than the last week of the current month
        else {
            setWeekIndex(0);
        }
        
    }else{
        setWeekIndex(weekIndex+1);
    }
    console.log("weekIndex:", weekIndex);
   }

  

    return (
        <header className="px-4 py-2 sm:flex block items-center">
            <div className="flex items-center">
                <img src={logo} alt="" className="mr-2 w-12 h-12"/>
                <h1 className="sm:mr-10 text- xl text-gray-500 font-bold">Week View</h1>
                
            </div>

            <div className="flex items-center">
                <button onClick={handleReset}  className="border rounded py-2 px-4 mr-5">Today</button>

                <button onClick={handlePrevWeek}><ChevronLeft className="material-icons-outlined cursor-pointer text-gray-600 mx-2">

                </ChevronLeft></button>
                <button onClick={handleNextWeek}><ChevronRight  className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                </ChevronRight ></button>

                <h2 className="ml-4 text-xl text-gray-500 font-bold"
                >{}</h2>
            </div>

            {
           selectedWeekMatrix && <div className="ml-4 text-xl text-gray-500 font-bold"> {`${(selectedWeekMatrix[0] as Dayjs)?.format('DD-MMM-YYYY')} - ${(selectedWeekMatrix[6] as Dayjs)?.format('DD-MMM-YYYY')}`}</div>
            }

        </header>

    );
}

export default WeekCalendarHeader;