import React, {useContext, useEffect, useState} from 'react';
import {
    BookmarkBorder,
    Check,
    Close,
    Delete,
    Done,
    DragHandle,
    Schedule,
    Segment,
    StartRounded, WorkHistory
} from "@mui/icons-material";
import GlobalContext from "../context/GlobalContext.ts";
import {useForm} from "react-hook-form";
import {Dayjs} from "dayjs";
import styled from "@emotion/styled";
import { employee_colorLabel_by_id, indexToTime } from '../util.ts';
import { drag } from '@syncfusion/ej2-react-schedule/index';
import { Employee } from '../interfaces.ts';

const EventModalStyles = styled.div`


`;

function EventModal() {
    //GlobalContext
    const {showEventModal,
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        employees,
        selectedEmployee,
        setSelectedEmployee,
        setSelectedTimeFrame,
        selectedTimeFrame,
        setSelectedTimeFrames,
        selectedTimeFrames,
        setIsDragging,
    } = useContext(GlobalContext);


    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            title: selectedEvent? selectedEvent!.title : 'regular-schedule',
            description: selectedEvent? selectedEvent!.description : 'regular-shift',
            startTime: selectedEvent ? selectedEvent!.startTime: selectedTimeFrame ? selectedTimeFrame : selectedTimeFrames? indexToTime( selectedTimeFrames[0], true) : '',
            endTime: selectedEvent ? selectedEvent!.endTime : selectedTimeFrames ? indexToTime(selectedTimeFrames[selectedTimeFrames.length-1], false)  : '',
            employee: selectedEvent ? JSON.stringify(selectedEvent.employee): JSON.stringify(selectedEmployee)
        }
    });

    useEffect(()=>{
        console.log("EventModal:selectedEvent", selectedEvent);
    },[]);



    // Dynamically increase employees
    // const extendedemployees = Array.from({length: categories.length},(_,i)=>employees[i%employees.length]);




    // Toggle DropDown
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleDropdown = ()=>{
        setIsOpen(true);
    }
    const handleSelect = (employee)=>{
        setSelectedEmployee(employee);
        setValue('employee', JSON.stringify(employee));
        setIsOpen(false);
    }


    const onsubmit = (data:any)=>{
        console.log(data);
        const calendarEvent = {
            title: data.title,
            description: data.description,
            employee: JSON.parse(data.employee),
            day: daySelected.valueOf(), // timestamp value(ex: 1631592000541)
            startTime: data.startTime,
            endTime: data.endTime,
            id: selectedEvent ? selectedEvent.id : Date.now() // should be changed to backend server id later
        }
        console.log("startTime:"+ calendarEvent.startTime);
        console.log("timestamp to Date object: ", new Date(daySelected.valueOf()));

        //dispatch
        if(selectedEvent){
            // update doesn't make new event. it finds the event & replace the properties
            dispatchCalEvent({type: "update", payload: calendarEvent});
        }else{
            // push makes new event
            dispatchCalEvent({type: "push", payload: calendarEvent});
        }

        //close Modal
        setShowEventModal(false);
        setIsDragging(false);
        employees? setSelectedEmployee(employees[0]) : '';
        
    }

    return (
        <EventModalStyles>

            <div className="z-20 h-screen w-full fixed left-0 top-0 flex justify-center items-center">
                <form className="bg-white rounded-lg shadow-2xl sm:w-1/4 w-full" onSubmit={handleSubmit(onsubmit)}>
                    <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                        <DragHandle className="material-icons-outlined text-gray-400">

                        </DragHandle>

                        <div>
                            {selectedEvent && (
                                <button  onClick={()=>{
                                    setSelectedEvent(null);
                                    dispatchCalEvent({type: "delete", payload: selectedEvent});
                                    setShowEventModal(false);
                                }} >
                                    <Delete className="text-gray-400 cursor-pointer">
                                    </Delete>
                                </button>
                            )}
                            {/* Close Button */}
                            <button  onClick={()=>{
                                setShowEventModal(false);
                                setIsDragging(false);
                                // Need to set selectedEvent null for the next modal open
                                setSelectedEvent(null);
                                setSelectedTimeFrame('');
                                setSelectedTimeFrames([]);
                            }}>
                                <Close className="text-gray-400">

                                </Close>
                            </button>
                        </div>

                    </header>

                    <div className="p-3">
                        <div className="grid grid-cols-1/5 items-end gap-y-7">

                            {/*row1*/}
                            <div></div>
                            <input
                                className="pb-1 border-0 text-gray-600 text-xl font-semibold w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                type="text" placeholder="add Title" id="title" {...register("title",{required: true})}/>

                            {/*row2*/}
                            <Schedule className="text-gray-400" />
                            <p>{daySelected && (daySelected as Dayjs)!.format("dddd, MMMM DD")}</p>

                            {/*row3*/}
                            <Segment className="text-gray-400"/>
                            <input
                                className=" border-0 text-gray-600 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                type="text" placeholder="Add a Description" id="description" {...register("description",{required: true})}/>


                            {/* row5: 시작 시간 */}
                            <WorkHistory className="text-gray-400" />
                            <input
                                className="border-0 text-gray-600 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                type="time" step="900" id="startTime" {...register("startTime", { required: true })} />

                            {/* row6: 종료 시간 */}
                            <Done className="text-gray-400" />
                            <input
                                className="border-0 text-gray-600 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                                type="time" step="900" id="endTime" {...register("endTime", { required: true })} />




                            <BookmarkBorder className="text-gray-400 mb-1"/>

                            <div>
                                <div className="relative">
                                    <input className="px-4 py-2" type="hidden" {...register("employee", { required: true })}
                                    ></input>
                                    <p

                                        className="px-2 pt-2 border rounded cursor-pointer flex items-center"
                                        onClick={toggleDropdown}
                                    >
                                        <span className={`inline-block w-4 h-4 mr-3 bg-${employee_colorLabel_by_id[selectedEmployee.id]}-100`}></span>
                                        <span>{`${selectedEmployee.firstName} ${selectedEmployee.lastName}` }</span>
                                        <img src={selectedEmployee.profile_pic} alt="" className='rounded-full h-4 w-4 ml-auto'/>
                                    </p>

                                    {isOpen && (
                                        <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg z-10 overflow-scroll max-h-[20vh]">
                                            {employees.map((em:Employee) => (
                                                <div
                                                    key={em.id}
                                                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                    onClick={() => handleSelect(em)}
                                                >
                                                   
                                                    <span className={`inline-block w-4 h-4 mr-2 bg-${employee_colorLabel_by_id[em.id%5]}-100`}></span>
                                                    <span>{`${em.firstName} ${em.lastName}`}</span>
                                                   
                                                    <img src={em.profile_pic} alt="" className='rounded-full h-5 w-5 ml-auto'/>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>

                        </div>


                    </div>

                    <footer className="flex justify-end w-100 border-t p-3 mt-5">
                        <button type="submit" className="bg-blue-300 hover:bg-blue-500 px-6 py-2 rounded text-gray-600">Save</button>
                    </footer>
                </form>
            </div>
        </EventModalStyles>

    );
}

export default EventModal;