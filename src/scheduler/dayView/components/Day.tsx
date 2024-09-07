import React, {useContext, useEffect, useState} from 'react';
import GlobalContext from "../../context/GlobalContext.ts";
import dayjs from "dayjs";
import { Employee} from "../../interfaces.ts";
import TimeFrame from "./TimeFrame.tsx";
import { dividerClasses } from '@mui/material';
import { employee_colorLabel_by_id } from '../../util.ts';


interface TimeFrameObject {
    start: number,
    end:number,
    label:string,
    employee: Employee
    event: Event | null;
}

//example
interface TimeFrameClassifiedByEmployeesID {
    id: { // jim, sam, etc...
        employee: Employee
        list: TimeFrameObject,
    }
}

function Day(props) {
        const{ daySelected, savedEvents,showEventModal, 
            displayedEmployees, setDisplayedEmployees,
            selectedView,
            pageIndex} = useContext(GlobalContext);
        const [dayEvents, setDayEvents] = useState([]);
        const [TimeFrameClassifiedByEmployeesID, setTimeFrameClassifiedByEmployeesID] = useState(

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
        // 2. displayedEmployees changes. Update displayed Employees Label & timeframe update(TimeFrameClassifiedByEmployees)
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


    
           

            // initialTableSet로 각 label별 배열 초기화 {id:{list: [0]}} - id로 찾을 수 있는 map 형태
            const initialTableSet = displayedEmployees.reduce((acc, employee) => {
                acc[employee.id] = {
                    employee: employee
                    ,list:[]};
                return acc;

            }, {}); // 빈 객체를 초기값으로 설정
            console.log("initialTableSet:", initialTableSet);

           //eventsIncludedtimeFrameClassifiedByEmployees - initialTableSet에서 빈 배열에 TimeFrame 형태로 변환된 이벤트들 채워넣음
            const TimeFrameClassifiedByEmployeesID_eventOnly = reformedDayEvents.reduce((acc, r)=>{
                const empId  = r.event.employee.id;
                if(Object.keys(acc).includes(String(empId))){
                    acc[empId].list.push(r);
                }
                return acc;
            }, initialTableSet);  // 초기화된 intialAcc부터 시작해서 각 label에 맞는 property에 이벤트들 꽃아줌


            console.log("eventsIncludedtimeFrameClassifiedByEmployees:",TimeFrameClassifiedByEmployeesID_eventOnly);

            //id 마다 순회하면서 hoursArray 생성
            for(let i =0; i<displayedEmployees.length; i++){
                // generate hoursArr of corresponding label and change the classifiedByemployees to hours Array
                initialTableSet[displayedEmployees[i].id].list = generateHoursArray( TimeFrameClassifiedByEmployeesID_eventOnly[displayedEmployees[i].id].list,displayedEmployees[i]);
            }

            setTimeFrameClassifiedByEmployeesID(TimeFrameClassifiedByEmployeesID_eventOnly);
        }
        }, [dayEvents,displayedEmployees, selectedView]); // selectedView가 바뀔때도 초기화해줘서 dummyEmployee 제대로 생성하게


        


        // 
        // Total 96 tiemSlots including events, non-assigned timeSlots
        const generateHoursArray  = (eventsById, employee)=>{
            let resultArray = [];
            let lastEnd = 0;
            for(let i = 0; i<eventsById.length; i++){
                //Getting Employee's event start, end time
                const {start, end} = eventsById[i]; // 16, 20

                // lastEnd 전까지 빈칸 채우기
                for(let j= lastEnd; j<start; j++){
                    resultArray.push({start: j, end: j+1, event: null, employee: employee})
                }
                //event 시간 채우기
                for(let k=start; k<end; k++){
                    resultArray.push({start: k, end: k+1, event: eventsById[i].event, initEvent: k=== start, employee: employee});
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
        <div className="flex-1 overflow-x-auto">
             <div className="flex-1 min-w-[720px] max-h-[100vh]">
        
        {/* 맨 위 employees */}
        {
            TimeFrameClassifiedByEmployeesID && (

                <div className="grid grid-cols-1/10 box-border border-r-[17px] h-[10vh] overflow-hidden">
                    <div className="text-center border border-l-transparent">Time</div>
                    <div className={`grid grid-cols-${Object.keys(TimeFrameClassifiedByEmployeesID).length} box-border text-center`}>
                        {Object.keys(TimeFrameClassifiedByEmployeesID).map((id,i)=>{
                            return ( 
                            <div key={i} className={`bg-${parseInt(id)>0? employee_colorLabel_by_id[TimeFrameClassifiedByEmployeesID[id].employee.id%5] : 'gray'}-100 text-gray-100 border-b flex justify-center py-3 items-center`}>
                           {parseInt(id)>0  ?
                           <>
                           <span ><img className='w-10 h-10 rounded-full mr-3' src={TimeFrameClassifiedByEmployeesID[id].employee.profile_pic} alt="" /></span>
                                <div className='flex flex-col'>
                                <span className='font-bold text-black truncate'>{`${TimeFrameClassifiedByEmployeesID[id].employee.firstName} ${TimeFrameClassifiedByEmployeesID[id].employee.lastName}`}</span>
                                <span className='text-gray-500'>{TimeFrameClassifiedByEmployeesID[id].employee.job}</span>
                                </div>
                           </>
                           :(
                                 <div className='flex flex-col'>
                                 <span className='font-bold text-black truncate'>Non-Assigned</span>
                                 <span className='text-gray-500'>Non-Assigned</span>
                                 </div>
                           )
                           }
                            </div>
                            
                        )
                        })
                        }
                    </div>
                </div>
            )
        }




        <div className="h-[90vh] grid grid-cols-1/10 box-border" style={{overflowY: 'scroll'}}>

{/* timeFrame(시간)  */}
<div className="h-[90vh] grid grid-cols-1 grid-rows-96 box-border sm:text-xl text-xs">
    {
        timeSlots.map((u,i)=>(
            <div key={i} className={`border border-l-transparent border-b-transparent ${i%4!==0 ? 'border-y-transparent': ''}
            flex items-center justify-center row-span-1 box-border text-center min-h-[26px]`}>{i%4===0? u: ""}</div>
        ))
    }



{/* Actual Schedule */}
</div>
{
    TimeFrameClassifiedByEmployeesID &&
    <div className={`h-screen grid grid-cols-${Object.keys(TimeFrameClassifiedByEmployeesID).length} box-border`}>
        {TimeFrameClassifiedByEmployeesID && Object.keys(TimeFrameClassifiedByEmployeesID).map((id, j)=>{
            return (<div key={j} className={`grid grid-cols-1 grid-rows-96 box-border`}>
                {
                    TimeFrameClassifiedByEmployeesID[id].list.map((h, i)=>{
                        const colorClass = h.event? `bg-${employee_colorLabel_by_id[h.event.employee.id%5]}-100`: '';
                        return (<TimeFrame  key={i} employee={h.employee} event={h.event} idx={i} colorClass={colorClass} initEvent={h.initEvent}/>)
                    })
                }
            </div>)
        })}
    </div>
}


</div>


        </div>
        <div className='px-8 py-4  bg-white rounded-lg shadow-md border border-gray-200'>
                  <h3 className='text-lg font-semibold mb-2 text-gray-800'>Pro Tips!</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Vertical Dragging enables you to select multiple Employees to generate schedules</li>
                        <li>Utilize Employee Display Control to navigate to the specific employees</li>
                        <li>Employee Search functionality will be updated shortly</li>
                  </ul>
                </div>
        </div>
    );

}

export default Day;