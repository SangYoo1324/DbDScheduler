import React, {useContext, useEffect, useState} from 'react';
import dayjs, { Dayjs } from "dayjs";
import {getMonthMatrix} from "../../util.ts";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import GlobalContext from "../../context/GlobalContext.ts";

function SmallCalendar() {

    const {monthIndex, setMonthIndex, setSmallCalendarMonth,setDaySelected, daySelected, selectedWeekMatrix} = useContext(GlobalContext);

    const [currentMonthIdx, setCurrentMonthIdx]=  useState(dayjs().month());
    const [currentMonthMatrix, setCurrentMonthMatrix] = useState(getMonthMatrix());


    const handlePrevMonth = ()=>{
        setMonthIndex(monthIndex-1);
    }


    const handleNextMonth = ()=>{
        setMonthIndex(monthIndex+1);
    }


    useEffect(()=>{
       setCurrentMonthIdx(monthIndex);
       setCurrentMonthMatrix(getMonthMatrix(monthIndex));
    },[monthIndex]);


    const getDayClass = (day:any)=>{
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
    
        const selectedDay = daySelected && daySelected.format(format);

       if(nowDay === currDay)  return  'bg-blue-500 rounded-full text-white'

           else if(currDay === selectedDay) return 'bg-blue-100 rounded-full text-blue-600 font-bold';

       else return "";
    }

    const isSelectedWeek = (targetDay:Dayjs)=>{

       const same =  selectedWeekMatrix?.some((day)=> {
      
        return    day.isSame(targetDay, 'day');
      }
    )  
   
    console.log(same);
    return same;
    }

    return (
        <div className="mt-9">
            <header className="flex justify-between">

                <p className="text-gray-500 font-bold">
                    {dayjs(new Date(dayjs().year(), currentMonthIdx))
                        .format("MMMM YYYY")}
                </p>
                <div>

                    <button onClick={handlePrevMonth}>
                        <ChevronLeft className="material-icons-outlined cursor-pointer text-gray-600 mx-2">

                        </ChevronLeft>
                    </button>
                    <button onClick={handleNextMonth}>
                        <ChevronRight className="material-icons-outlined cursor-pointer text-gray-600 mx-2">

                        </ChevronRight>
                    </button>

                </div>

            </header>

            <div className="grid grid-cols-7 grid-rows-6">
                {currentMonthMatrix[0].map((day:any,i:any)=>(
                    <span key={i} className="text-sm py-1 text-center">
                        {day.format("dd").charAt(0)}
                    </span>
                ))}

                {
                    currentMonthMatrix.map((row:any, i:number)=>(
                        <React.Fragment  key={i}>
                            {row.map((day:any,idx:number)=>(
                                    <button
                                        onClick={()=>{
                                            console.log("moving with smallCalendar click",currentMonthIdx)
                                            setSmallCalendarMonth(currentMonthIdx)
                                            setDaySelected(day);
                                        }}
                                        key={idx} className={`py-1 w-full flex items-center justify-center ${isSelectedWeek(day) ? 'bg-yellow-100' : ''}`}>
                                        <span className={`text-sm ${getDayClass(day)} flex-1 text-center` }>{day.format('D')}</span>
                                    </button>
                                )
                                )}
                        </React.Fragment>
                    ))
                }
            </div>

        </div>
    );
}

export default SmallCalendar;