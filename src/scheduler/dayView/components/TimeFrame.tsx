import React, {useContext} from 'react';
import GlobalContext from "../../context/GlobalContext.ts";

//                 label color, idx, event객체, event 첫부분인지 판별
function TimeFrame({colorName, idx, event, initEvent, employee}) {
    const {setShowEventModal, setSelectedEvent, setSelectedEmployee, setSelectedTimeFrame} = useContext(GlobalContext);
    const toggleTimeFrame = ()=>{
        // 빈 timeFrame이라면 startTime 추가 해서 starTime은 autoAssign 되게
        if(!event){
            const starTime = indexToTime(idx);
            console.log("startTime"+starTime);
            setSelectedTimeFrame(starTime);
        }
        setSelectedEmployee(event? event.employee : employee);
        console.log("event:::",event)
        setSelectedEvent(event);
        setShowEventModal(true);
        //event가 null일때만 timeFrame 정해서 modal에 시작time 설정



    }


    return (
        <div>

        <div onClick={toggleTimeFrame}  className={`${event? '': 'border'} box-border idx-${idx}  row-span-1 ${colorName} ${event ? "":"hover:bg-gray-100"} box-border min-h-[26px] text-center text-gray-100 cursor-pointer`}>
            {event && initEvent && `${event.startTime} ~ ${event.endTime}`}
        </div>

        </div>
        
    );
}

function indexToTime(index:number){
    const totalMinutes = index * 15; // 15분 단위
    const hours24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours24.toString().padStart(2,'0')}:${minutes.toString().padStart(2, '0')}`;
}

export default TimeFrame;