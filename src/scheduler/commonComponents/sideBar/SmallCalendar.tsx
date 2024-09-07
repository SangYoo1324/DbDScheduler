import React, {useContext, useEffect, useState} from 'react';
import dayjs, { Dayjs } from "dayjs";
import {findNthOfTheWeek, findWeekIdxOfPPMonthMatrix, getMonthMatrix, getPPMonthMatrix, getRelativeMonthIndex} from "../../util.ts";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import GlobalContext from "../../context/GlobalContext.ts";
import { get } from 'react-hook-form';
import { payPeriod } from '../../GlobalVar.ts';

function SmallCalendar() {

    const {monthIndex, setMonthIndex, setSmallCalendarMonth,setDaySelected,
         selectedView,
         daySelected,
         selectedWeekMatrix,
         setSelectedWeekMatrix,
         setWeekIndex,
         setIsSmallCalendarClicked,
        PPweekIndex} = useContext(GlobalContext);

    const [currentRelMonthIdx, setCurrentMonthIdx]=  useState(dayjs().month()); // relativeMonthIdx
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
        console.log("WeekIndex:", PPweekIndex);
        
        

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
        // console.log("체쿠: targetDay:", targetDay.format("DD-MM-YY"));
        // console.log("체쿠: selectedWeekMatrix:", selectedWeekMatrix);
       const same =  selectedWeekMatrix?.some((day)=> {
                    // dayjs object comparison
        return    day.isSame(targetDay, 'day');
      }
    )  
   
    return same;
    }

    return (
        <div className="mt-9">
            <header className="flex justify-between">

                <p className="text-gray-500 font-bold">
                    {dayjs(new Date(dayjs().year(), currentRelMonthIdx))
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
                                            setDaySelected(day);  
                                            setIsSmallCalendarClicked(true);                                             
                                            // monthIndex가 현재 날짜 기준이므로, 현재 날짜와 선택된 날짜의 차이를 구해서 payPeriod를 찾아야함(다음 연도로 넘어가버리면 monthIndex가 달라져버려서)
                                            //setWeekIndex(findWeekIdxOfPPMonthMatrix(getPPMonthMatrix(getRelativeMonthIndex(day), payPeriod), day));
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