import React from 'react';
import dayjs, {Dayjs} from "dayjs";
import {Employee} from "../interfaces.ts";
import timeFrame from "../dayView/components/TimeFrame.tsx";
import { set } from 'react-hook-form';
import { payPeriod } from '../GlobalVar.ts';
import { getPPMonthMatrix } from '../util.ts';




// just initial value, actual init will be on ContextWrapper
const GlobalContext = React.createContext({
    selectedView: "WEEK",
    setSelectedView: (view)=>{},
    PPweekIndex: 0,
    setWeekIndex: (index:number)=>{},
    selectedWeekMatrix: [],
    setSelectedWeekMatrix: (matrix)=>{},
    monthMatrix: null,
    setMonthMatrix: (matrix)=>{},
    monthIndex: 0,
    setMonthIndex: (index:number)=>{},
    smallCalendarMonth: null,
    setSmallCalendarMonth: (index:any)=>{},
    daySelected: dayjs(),
    setDaySelected: (index:any)=>{},
    showEventModal: false,
    setShowEventModal: (show:boolean)=> {},
    dispatchCalEvent: ({type, payload})=>{},
    savedEvents: [],
    selectedEvent: null,
    setSelectedEvent: (event)=>{},
    employees:[],
    setEmployees: (label)=>{},
    displayedEmployees:[],
    setDisplayedEmployees: (employees)=>{},
    //Required for initializing EventModal's selectedEmployee
    selectedEmployee: null,
    setSelectedEmployee: (employee)=>{},
    selectedTimeFrame:'',
    setSelectedTimeFrame: (timeFrame)=>{},
    openExpandModal: false,
    setOpenExpandModal: (open)=>{},
    pageIndex: 0,
    setPageIndex: (idx)=>{},
    // dragEndTimeFrame: '',
    // setDragEndTimeFrame: (timeFrame)=>{},
    isDragging: false,
    setIsDragging: (isDragging)=>{},  
    selectedTimeFrames: [],
    setSelectedTimeFrames: (timeFrames)=>{},
    perPage:5,
    setPerPage: (perPage)=>{},
    selectedDays: [],
    setSelectedDays: (days)=>{},
    showComplexEventModal: false,
    setShowComplexEventModal: (show)=>{},

    ppMonthMatrix: [], 
    setPPMonthMatrix: (matrix)=>{},

    isSmallCalendarClicked: false,
    setIsSmallCalendarClicked: (clicked)=>{},
});


export default  GlobalContext;