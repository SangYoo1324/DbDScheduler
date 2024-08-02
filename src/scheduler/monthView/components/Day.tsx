import React, {useContext, useEffect, useState} from 'react';
import dayjs, {Dayjs} from "dayjs";
import GlobalContext from "../../context/GlobalContext.ts";
import {colorClasses} from "../../util.ts";
import ExpandModal from "../../commonComponents/ExpandModal.tsx";
import {Badge, IconButton} from "@mui/material";
import {ArrowDownward, Mail, MoreHoriz, MoreVert} from "@mui/icons-material";


// @ts-ignore
function Day({day, rowIdx, employeesFilterInfo}) {

    const {monthIndex,
        setMonthIndex,
        setSmallCalendarMonth,
        setDaySelected,
        daySelected,
        setShowEventModal,
        savedEvents,
        setSelectedEvent,
        setSelectedEmployee,
        setOpenExpandModal
        ,openExpandModal,
        } = useContext(GlobalContext);

    // events assigned for this day
    const [dayEvents, setDayEvents] = useState([]);

    useEffect(()=>{
        console.log("monthIndex:"+ monthIndex);
        const eventsForTheDay =  savedEvents.filter(e=> { 
            return dayjs(e.day).format("DD-MM-YY") === day.format("DD-MM-YY")});
        setDayEvents(eventsForTheDay);

        eventsForTheDay.forEach(e=>{console.log("checkSavedEvents:", e)})
    },[savedEvents, day]);


    const getCurrentDayClass = ()=>{
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'bg-blue-600 text-white rounded-full w-7' : "";
    }

    const handleOpenExpandModal = (event)=>{
            event.stopPropagation();
        console.log(openExpandModal);
        setDaySelected(day);
        setOpenExpandModal(true);
    }

    return (
        <div className={`border border-gray-200 flex flex-col relative
        ${daySelected && (daySelected! as Dayjs).format('DD-MM-YY') === day.format("DD-MM-YY") ? 'bg-blue-100 text-blue-600': ''}`} onClick={()=>{
            setDaySelected(day);
            setShowEventModal(true);
        }}>

            <header className="flex  flex-col items-center">
                {rowIdx ===0 &&    <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>}

                <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
                    {day.format('DD')}</p>
            </header>


            {/*Events inside day*/}
        <div className="flex-1 cursor-pointer" >
            {dayEvents.map((e, idx)=>{
                if(idx <=3){
                    return (
                        <div
                            onClick={()=> {
                                setSelectedEmployee(e.employee);
                                setSelectedEvent(e);
                            }}
                            key={idx} className={`bg-${e.employee.label}-500 p-1 sm:mr-3 text-gray-600 text-sm rounded mb-1 truncate ${
                                // event의 employee가 checked면 보여주고 아니면 hidden
                                employeesFilterInfo.find(em=>{
                                
                                    return em.id === e.employee.id}).checked ? '': 'hidden'}`}>
                            {e.title}
                        </div>
                    )
                }else{
                    return ;
                }

            })}
            { dayEvents.length>3 && <div onClick={handleOpenExpandModal} className="bg-gray-200 p-1 sm:mr-3 text-gray-600 text-sm rounded
             mb-1 text-center font-bold">
                <IconButton color="primary">
                    <Badge badgeContent={dayEvents.length-4} color="error" className="z-0" >
                        <MoreHoriz/>
                    </Badge>

                </IconButton>

            </div>}
        </div>
            {openExpandModal && daySelected.format("MM-DD-YY")===day.format("MM-DD-YY")  && <ExpandModal  events={dayEvents}/>}
        </div>
    );
}

export default Day;