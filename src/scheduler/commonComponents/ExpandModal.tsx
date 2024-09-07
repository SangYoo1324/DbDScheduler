import React, {useContext} from 'react';
import GlobalContext from "../context/GlobalContext.ts";
import {Close} from "@mui/icons-material";
import { employee_colorLabel_by_id } from '../util.ts';

function ExpandModal({events}) {

    const {setOpenExpandModal,setShowEventModal,setSelectedEvent,setSelectedEmployee }= useContext(GlobalContext);

    const handleEventClick = (event ,assignedEvent)=>{
        event.stopPropagation();
        console.log("HandleEventClick From expandedModal", assignedEvent);
        setSelectedEvent(assignedEvent);
        setSelectedEmployee(assignedEvent.employee);
        setShowEventModal(true);
    }

    return (
        <div className="absolute w-full h-[100%] z-19 bg-white rounded overflow-y-scroll border border-gray-400">
            <header className="flex items-center justify-end p-1 border-b-gray-400">
                <button onClick={(event)=>{
                    event.stopPropagation();
                    setOpenExpandModal(false);
                }}><Close className="text-gray-400"></Close></button></header>
            {events.map((e, i)=>{
                console.log("eventLog", e);
                return (<div key={i}
                             onClick={(event)=>handleEventClick(event,e)}
                             className={`bg-${employee_colorLabel_by_id[e.employee.id%5]}-100 border border-gray-400 rounded px-3 text-gray-700 cursor-pointer truncate mb-1`}>
                        {e.employee.firstName} - {e.title}
                </div>)
            })}
        </div>
    );
}

export default ExpandModal;