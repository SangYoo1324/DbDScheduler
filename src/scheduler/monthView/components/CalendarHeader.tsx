import React, {useContext, useEffect} from 'react';
import logo from '../../assets/scheduler_logo.png'
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import GlobalContext from "../../context/GlobalContext.ts";
import dayjs from "dayjs";
import Search from '../../commonComponents/sideBar/Search.tsx';

function CalendarHeader() {

    const {monthIndex, setMonthIndex} = useContext(GlobalContext);

    const handlePrevMonth = ()=>{
        setMonthIndex(monthIndex-1);

    };

    const handleNextMonth = ()=>{
        setMonthIndex(monthIndex+1);

    }

    const handleReset = () =>{
        setMonthIndex(dayjs().month());
    }

    useEffect(()=>{
        console.log("monthIndex changed:", monthIndex);
    }, [monthIndex]);

    return (
        <header className="px-4 py-2 sm:flex block items-center w-full ">
            <div className="flex items-center">
                <img src={logo} alt="calendar" className="mr-2 w-12 h-12 flex items-center"/>
                <h1 className="mr-10 text- xl text-gray-500 font-bold ">Month View</h1>
                <div className="mt-1 sm:hidden">
                <Search/>
                </div>
            
            </div>

            <div className="flex items-center">
                <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">Today</button>

                <button onClick={handlePrevMonth}><ChevronLeft className="material-icons-outlined cursor-pointer text-gray-600 mx-2">

                </ChevronLeft></button>
                <button onClick={handleNextMonth}><ChevronRight  className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                </ChevronRight ></button>

                <h2 className="ml-4 text-xl text-gray-500 font-bold"
                >{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h2>
            </div>

        </header>
    );
}

export default CalendarHeader;