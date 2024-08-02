import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from "../../context/GlobalContext.ts";
import dayjs from "dayjs";
import {CustomEvent, Employee} from "../../interfaces.ts";
import TimeFrame from "./TimeFrame.tsx";
import { dividerClasses } from '@mui/material';


interface TimeFrameObject {
    start: number,
    end:number,
    label:string,
    employee: Employee
    event: CustomEvent | null;
}

//example
interface ObjectClassifiedByEmployees {
    jim: { // jim, sam, etc...
        label: string,
        list: TimeFrameObject,
    },
    sam: { // jim, sam, etc...
        label: string,
        list: TimeFrameObject,
    },
}

function Day(props) {
        const{ daySelected, savedEvents,showEventModal, displayedEmployees} = useContext(GlobalContext);
        const [dayEvents, setDayEvents] = useState([]);
        const [objectClassifiedByemployees, setObjectClassifiedByemployees] = useState(

            null
        ); //최종 형태는 96개의 객체로 이루어져 15분마다 event객체가 있다면 담고있다. 없다면 null

        // trigger point
        // 1. update filtered DayEvents as day Changes
        // 2. update filtered DayEvents as savedEventChanges upon update Schedule
        useEffect(()=>{
            console.log("dayEvent 추출기")
            if(savedEvents.length>0){
                console.log("savedEvents: ", savedEvents);
                const filtered =      savedEvents.filter((e)=>{
                    console.log("eventDate",dayjs(e.day).format("DD-MM-YY"))

                    console.log("daySelected", daySelected.format("DD-MM-YY"))
                    return dayjs(e.day).format("DD-MM-YY") === daySelected.format("DD-MM-YY")})
                    .sort((a,b)=> a.start-b.start)

                setDayEvents(
                    filtered
                );
            }

        },[savedEvents, daySelected]);


        //trigger point
        // 1. dayEvent Changes upon modification on savedEvents or dayChanges
        // 2. displayedEmployees changes. Update displayed Employees Label & timeframe update(ObjectClassifiedByEmployees)
        useEffect(()=>{
      
        if(displayedEmployees.length>0){
            console.log("displayedEmployees:", displayedEmployees);
            console.log("dayEvents:", dayEvents); // { startTime: "03:00", endTime: "15:00", event: EventObject}

            // reformedDayEvents-  - DayEvent를 startTime, EndeTime의 시간 단위를 1~96 사이 index로 변환
            // {end: 20, event: EventObject, start: 16}
            const reformedDayEvents =  dayEvents.map(e=>{
                // *4를 해서 15분 단위의 row를 만들려고(24hour *4 = 96 ttl timeFrame) // 15분 단위의 경우는 15로 나눠서 15분당 1프레임씩
                return {start: parseInt(e.startTime.substring(0,2))*4+ Math.floor(e.startTime.substring(3)/15), end: parseInt(e.endTime.substring(0,2))*4+Math.floor(e.endTime.substring(3)/15) as number, event: e}
            } )
            console.log("reformedDayEvents", reformedDayEvents);

            // initialTableSet로 각 label별 배열 초기화 {id: {label:'cyan', fullName: 'sam yi', list: [0]}}
            const initialTableSet = displayedEmployees.reduce((acc, employee) => {
                acc[employee.id] = {label: employee.label,fullName:`${employee.firstName} ${employee.lastName}`,list:[]};
                return acc;
            }, {}); // 빈 객체를 초기값으로 설정
            console.log("initialTableSet:", initialTableSet);

           //reformedEventsClassifiedByemployees - initialTableSet에서 빈 배열에 TimeFrame들을 채워넣음
            const reformedEventsClassifiedByemployees = reformedDayEvents.reduce((acc, r)=>{
                const empId  = r.event.employee.id;
                console.log("empId", empId);
                console.log("Object.keys(acc)",Object.keys(acc));
                console.log("r",r);
                console.log(Object.keys(acc).includes(String(empId)))
                if(Object.keys(acc).includes(String(empId))){
                    acc[empId].list.push(r);
                }
                return acc;
            }, initialTableSet);  // 초기화된 intialAcc부터 시작해서 각 label에 맞는 property에 이벤트들 꽃아줌


            console.log("reformedEventsClassifiedByemployees:",reformedEventsClassifiedByemployees);

            //label마다 순회하면서 hoursArray 생성
            for(let i =0; i<displayedEmployees.length; i++){
                // generate hoursArr of corresponding label and change the classifiedByemployees to hours Array
                console.log("classifiedByemployees[displayedEmployees[i].id]",reformedEventsClassifiedByemployees[displayedEmployees[i].id]);
                initialTableSet[displayedEmployees[i].id].list = generateHoursArray( reformedEventsClassifiedByemployees[displayedEmployees[i].id].list,displayedEmployees[i]);
            }
            
            console.log("classifiedByemployees after reformation to hoursArray:", reformedEventsClassifiedByemployees);
            setObjectClassifiedByemployees(reformedEventsClassifiedByemployees);
        }
        }, [dayEvents,displayedEmployees]);



        // change the array only with events to hoursArray contains non-assigned timeframe (eventArray -> hoursArray containing events, non assigned timeSlots)
        // Total 96 tiemSlots including events, non-assigned timeSlots
        const generateHoursArray  = (eventsByLabel, employee)=>{
            let resultArray = [];
            let lastEnd = 0;
            console.log("eventsByLabel", eventsByLabel);
            for(let i = 0; i<eventsByLabel.length; i++){
                //Getting Employee's event start, end time
                const {start, end} = eventsByLabel[i];

                // lastEnd 전까지 빈칸 채우기
                for(let j= lastEnd; j< start; j++){
                    resultArray.push({start: j, end: j+1, event: null, employee: employee})
                }
                //event 시간 채우기
                for(let k=start; k<end; k++){
                    resultArray.push({start: k, end: k+1, event: eventsByLabel[i].event, initEvent: k=== start, employee: employee});
                }

                lastEnd = end;
            }

            // fill the rest until 24
            for(let i= lastEnd; i<96; i++ ){
                resultArray.push({start:i, end: i+1, event: null, employee: employee})
            }
            return resultArray;
        }

        // will be utilized for 0:00 ~ 23:00
        const timeSlots = [];
        for(let i =0; i<24*4; i++){
            const hour = Math.floor(i/4);
            const min = (i%4)*15;
            timeSlots.push(`${hour.toString().padStart(2,'0')}:${min.toString().padStart(2, '0')}`)
    }

    return (  
         // flex-1 is required to take all the space to the end of the x-axis
        <div className=" overflow-x-auto flex-1">
             <div className="flex-1 border min-w-[720px]">
        
        {/* 맨 위 employees */}
        {
            objectClassifiedByemployees && (

                <div className="grid grid-cols-1/10 box-border">
                    <div className="text-center border border-l-transparent">Time</div>
                    <div className={`grid grid-cols-${Object.keys(objectClassifiedByemployees).length} box-border text-center `}>
                        {Object.keys(objectClassifiedByemployees).map((id,i)=>{
                            return ( <div key={i} className={`bg-${objectClassifiedByemployees[id].label}-500 text-gray-100 border-b`}>{objectClassifiedByemployees[id].fullName}</div>)
                        })
                        }
                    </div>
                </div>
            )
        }




        <div className="h-screen grid grid-cols-1/10 box-border">

{/* timeFrame(시간)  */}
<div className="h-screen grid grid-cols-1 grid-rows-96 box-border sm:text-xl text-xs">
    {
        timeSlots.map((u,i)=>(
            <div key={i} className={`
            flex items-center justify-center border border-l-transparent border-b-transparent ${i%4!==0 ? 'border-transparent': ''} row-span-1 box-border text-center min-h-[26px]`}>{i%4===0? u: ""}</div>
        ))
    }


{/* Actual Schedule */}
</div>
{
    objectClassifiedByemployees &&
    <div className={`h-screen grid grid-cols-${Object.keys(objectClassifiedByemployees).length} box-border`}>
        {objectClassifiedByemployees && Object.keys(objectClassifiedByemployees).map((id, j)=>{
            return (<div key={j} className={`grid grid-cols-1 grid-rows-96 box-border`}>
                {
                    objectClassifiedByemployees[id].list.map((h, i)=>{
                        const colorName = h.event? `bg-${h.event.employee.label}-500`: '';
                        return (<TimeFrame  key={i} employee={h.employee} event={h.event} idx={i} colorName={colorName} initEvent={h.initEvent}/>)
                    })
                }
            </div>)
        })}
    </div>
}


</div>


        </div>
    
        </div>
    );

}

export default Day;