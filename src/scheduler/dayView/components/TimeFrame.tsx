import React, {useContext, useEffect} from 'react';
import GlobalContext from "../../context/GlobalContext.ts";
import { indexToTime, timeToIndex } from '../../util.ts';

//                 label color, idx, event객체, event 첫부분인지 판별
function TimeFrame({colorClass, idx, event, initEvent, employee}) {


    

    const {setShowEventModal, 
        setSelectedEvent,
        selectedEmployee, setSelectedEmployee,
        setSelectedTimeFrame, selectedTimeFrame,
        isDragging, setIsDragging, 
        // setDragEndTimeFrame,
        setSelectedTimeFrames, selectedTimeFrames   , 
        dispatchCalEvent
        } = useContext(GlobalContext);


    const hasEvent = event ? true : false;   


    const toggleTimeFrame = ()=>{
        // 빈 timeFrame이라면 startTime 추가 해서 starTime은 autoAssign 되게
        if(!event){
            const starTime = indexToTime(idx, true);
            console.log("startTime"+starTime);
            setSelectedTimeFrame(starTime);
        }
        setSelectedEmployee(event? event.employee : employee);
        console.log("event:::",event)
        setSelectedEvent(event);
        setShowEventModal(true);
        //event가 null일때만 timeFrame 정해서 modal에 시작time 설정



    }


    const handleMouseDown = (e)=>{ 
        e.preventDefault()
      
        console.log("MouseDown", event);
        setSelectedEmployee(employee);
        setSelectedTimeFrames([idx]);
        setIsDragging(true);
     }


     // 마우스 떼면 선택된 timeFrame들을 sorting 하고 modal을 띄움
     const handleMouseUp = (e)=>{ 
        console.log("MouseUp", event);

       
        console.log("selectedTimeFrame",selectedTimeFrames.sort((a,b)=>a-b));
      
        //sorting 전에 scroll 로 인해 누락된 timeFrame 추가
        //  sorting
        setSelectedTimeFrames([...selectedTimeFrames, selectedTimeFrames.sort((a,b)=>a-b)[selectedTimeFrames.length-1]]);
        
        setShowEventModal(true);
        
      }


      const handleMosueOver = (e)=>{
        console.log("MouseOver", event);
      

        // dragging 시에만 작동
        if(isDragging){
            // 기존 이벤트와 겹치면 merge 할 것인지 물어보기
            if(hasEvent){
                // const calendarEvent = {
                //     title: event.title,
                //     description: event.description,
                //     employee: JSON.parse(event.employee),
                //     day: event.day, // timestamp value(ex: 1631592000541)
                //     startTime: event.startTime,
                //     endTime: event.endTime,
                //     id: event ? event.id : Date.now() // should be changed to backend server id later
                // }

                // if(confirm("Event already assigned for the timeframe, do you want to merge?")){
                //     dispatchCalEvent({type: "update", payload: calendarEvent});       
                // }else{
                //     setIsDragging(false);
                //     return;
                // }
                alert("Event already assigned for the timeframe, do you want to merge?");
                setIsDragging(false);
            } 

                setSelectedTimeFrames((prevFrames:any[])=>{
                    const updatedFrames = [...prevFrames];
                 // 이전 timeFrames 에서 scroll 때문에 누락된 timeFrame 추가
                    fillTimeFrameGap(updatedFrames);
                // 이전에 선택된 timeFrame에 없는 timeFrame만 추가
                    if(!updatedFrames.includes(parseInt(idx))){
                    updatedFrames.push(parseInt(idx));
                        }else {
                // 이전에 선택된 timeFrame에 있는 timeFrame을 다시 선택할 때
                    updatedFrames.pop();
                 }

                    return updatedFrames;

                });
            
            
                console.log("selectedTimeFrames",selectedTimeFrames);
        }

       


        const fillTimeFrameGap = (updatedFrames)=>{
            // 이전 timeFrames 에서 scroll 때문에 누락된 timeFrame 추가
            for(let i=0; i<updatedFrames.length-1; i++){
              const numbersToInsert = [];
              if(updatedFrames[i]-updatedFrames[i+1]>1){ // 내려가는 드래깅  8,3
                  
                  for(let j = updatedFrames[i]-1; i>updatedFrames[i+1]; j--){ // 7,6,5,4
                      numbersToInsert.push(j);
                  }
                  updatedFrames.splice(i+1,0,...numbersToInsert);
              }
              if(updatedFrames[i]-updatedFrames[i+1]<-1){ // 올라가는 드래깅  3,8
          
                  for(let k=updatedFrames[i]+1; k<updatedFrames[i+1]; k++){
                     numbersToInsert.push(k);
                  }
                  updatedFrames.splice(i+1,0,...numbersToInsert);
              }
          }
          
          
          console.log("updatedFrames",updatedFrames);
          
              }

      }

     const handleEventToggle = (e)=>{
        e.stopPropagation();
        console.log("event toggle", event);
        setSelectedEmployee(employee);
        setSelectedEvent(event);
        setShowEventModal(true);
     }





    return (
        <div>

        <div
        // only enabled when employee is not dummy & event is null(so specific event assigned to the timeFrame)
         onMouseDown={employee.id >= 0 && !hasEvent ? handleMouseDown : undefined}
         onMouseUp={employee.id >= 0 && !hasEvent ?  handleMouseUp : undefined}
         onMouseOver={employee.id >= 0  ?  handleMosueOver : undefined}
         onClick={employee.id >= 0 && hasEvent ? handleEventToggle: undefined} 
         className={`${isDragging && selectedTimeFrames?.includes(parseInt(idx)) && employee.id===selectedEmployee.id? 'bg-blue-100' : ''}
        font-bold text-gray-700 ${event? '': 'border'} box-border idx-${idx}
          row-span-1 ${colorClass} ${event ? "":"hover:bg-gray-100"} box-border min-h-[26px] text-center text-gray-100 ${employee.id<0? 'cursor-not-allowed': 'cursor-pointer'}`}>
            {event && initEvent && `${event.startTime} ~ ${event.endTime}`}
        </div>

        </div>
        
    );

 
}



export default TimeFrame;