import React, {useEffect, useReducer, useState} from 'react';
import GlobalContext from "./GlobalContext.ts";
import dayjs from "dayjs";
import {getMonthMatrix, sampleEmployees} from "../util.ts";
import { Employee} from "../interfaces.ts";

const ContextWrapper = (props:any) =>{
    const [selectedView, setSelectedView] = useState();
    const [PPweekIndex, setWeekIndex]= useState<number>();
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [monthMatrix, setMonthMatrix] = useState(getMonthMatrix(dayjs().month()));
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<CustomEvent>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>('');
    const [displayedEmployees, setDisplayedEmployees] = useState<Employee[]>([]);
    const [openExpandModal, setOpenExpandModal] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);
    const [selectedWeekMatrix, setSelectedWeekMatrix] = useState([]);
    const [selectedTimeFrames, setSelectedTimeFrames] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [dragEndTimeFrame, setDragEndTimeFrame] = useState(null);
    const [perPage, setPerPage] = useState(5);
    const [selectedDays, setSelectedDays] = useState([]);
    const [showComplexEventModal, setShowComplexEventModal] = useState(false);
    const [ppMonthMatrix, setPPMonthMatrix] = useState([]);
    const [isSmallCalendarClicked, setIsSmallCalendarClicked] = useState(false);
    function initEvents(){
        const storageEvents = localStorage.getItem('savedEvents');
        return storageEvents ? JSON.parse(storageEvents) : [];
    }
    type Action =
        | { type: 'push'; payload: any }
        | { type: 'delete'; payload: any }
        | { type: 'update'; payload: any };

    const savedEventReducer = (state:any, action:Action)=>{
    switch(action.type){
        case 'push':
            // state(배열)에서 payload(event 객체) 추가
            return [...state, action.payload];
        case 'update':
            // payload에 있는 요소를 id를 통해 기존꺼 찾고 덮어씀 state에 추가
            return state.map((event:any)=>event.id === action.payload.id! ? action.payload : event);
        case 'delete':
            // payload에 있는 지울 대상 제외 삭제
            return state.filter((event:any)=> event.id !== action.payload.id)
        default:
            throw new Error();
    }
    }

    // reducer Function
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventReducer,[], initEvents);

    // EveryTime change happen on savedEvents, it will automatically store on the local storage & initialize
    useEffect(()=>{
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
    },[savedEvents]);

    useEffect(()=>{
        // employees가 업데이트 되 있지 않을 때만 실행
        if(employees.length===0){
            setEmployees(sampleEmployees);
        }
        // employees가 업데이트 되 있을 때만 실행
        if(employees.length>0)setSelectedEmployee(employees[0]);
    },[employees])


    useEffect(()=>{
        // only if smallCalendarMonth has assigned value
        if(smallCalendarMonth !== null){
            setMonthIndex(smallCalendarMonth);
        }
    },[smallCalendarMonth])

    // change monthMatrix as monthIndex Changes
    useEffect(()=>{
       setMonthMatrix(getMonthMatrix(monthIndex));
    },[monthIndex])





    return (
        <GlobalContext.Provider value={{
            selectedView,
            setSelectedView,   
            PPweekIndex,
            setWeekIndex,
            selectedWeekMatrix,
            setSelectedWeekMatrix,
            monthMatrix,
            setMonthMatrix,
            monthIndex,
            setMonthIndex,
            smallCalendarMonth ,
            setSmallCalendarMonth,
            daySelected,
            setDaySelected,
            showEventModal,
            setShowEventModal,
            dispatchCalEvent,
            savedEvents,
            selectedEvent,
            setSelectedEvent,
            employees,
            setEmployees,
            selectedEmployee,
            setSelectedEmployee,
            selectedTimeFrame,
            setSelectedTimeFrame,
            displayedEmployees,
            setDisplayedEmployees,
            openExpandModal,
            setOpenExpandModal,
            pageIndex,
            setPageIndex,
            // dragEndTimeFrame,
            // setDragEndTimeFrame,
            isDragging,
            setIsDragging,
            selectedTimeFrames,
            setSelectedTimeFrames,
            perPage,
            setPerPage,
            showComplexEventModal, setShowComplexEventModal,
            ppMonthMatrix, setPPMonthMatrix,

            isSmallCalendarClicked,
            setIsSmallCalendarClicked,
        }}>
            {props.children}
        </GlobalContext.Provider>
    );
}
export default ContextWrapper;