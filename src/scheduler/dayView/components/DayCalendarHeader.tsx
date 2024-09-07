import React, {useContext} from 'react';
import logo from '../../assets/scheduler_logo.png'
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext.ts";
import EmployeePagination from "../../commonComponents/EmployeePagination.tsx";
import { findNthOfTheWeek } from '../../util.ts';
function DayCalendarHeader(props) {

    const {daySelected, setDaySelected, setWeekIndex, monthIndex} = useContext(GlobalContext);

    const handlePrevDay = ()=>{
        setDaySelected(daySelected.subtract(1, 'day'));
        setWeekIndex(findNthOfTheWeek(daySelected.subtract(1, 'day')));
    }

    const handleNextDay = () =>{
        setDaySelected(daySelected.add(1,'day'));
        setWeekIndex(findNthOfTheWeek(daySelected.add(1,'day')));
    }

    const handleReset = ()=>{
        setDaySelected(dayjs());
        setWeekIndex(findNthOfTheWeek(dayjs()));
    }



    return (
        <header className="px-4 py-2 sm:flex block items-center">
            <div className="flex items-center">
                <img src={logo} alt="" className="mr-2 w-12 h-12"/>
                <h1 className="sm:mr-10 text- xl text-gray-500 font-bold">Day View</h1>
                <div className="sm:hidden block ml-4">  <EmployeePagination /></div>
            </div>

            <div className="flex items-center">
                <button onClick={handleReset}  className="border rounded py-2 px-4 mr-5">Today</button>

                <button onClick={handlePrevDay}><ChevronLeft className="material-icons-outlined cursor-pointer text-gray-600 mx-2">

                </ChevronLeft></button>
                <button onClick={handleNextDay}><ChevronRight  className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                </ChevronRight ></button>

                <h2 className="ml-4 text-xl text-gray-500 font-bold"
                >{daySelected.format("MMMM DD YYYY")}</h2>
            </div>

        </header>

    );
}

export default DayCalendarHeader;