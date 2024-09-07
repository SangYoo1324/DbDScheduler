import React, {useContext, useEffect, useState} from "react";
import Day from "./Day.tsx";
import GlobalContext from "../../context/GlobalContext.ts";
import dayjs from "dayjs";


// @ts-ignore
function Month({}) {

    // contextWrapper에서 monthIndex가 바뀔 때마다 monthMatrix를
    // 초기화하는 useEffect가 있기 때문에 matrix를 가져오기만 하면 된다
    const {monthMatrix, employees} = useContext(GlobalContext);


    useEffect(()=>{
        console.log("employees:: ", employees);
    },[employees])

    return (
        <div className="flex-1 flex flex-col h-screen overflow-auto">

        <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-x-auto min-w-[720px]">
        
            {monthMatrix.map((row:any, i:any)=>(
            <React.Fragment key={i}>
                {row.map((day:any,idx:any)=>{
                    // console.log(day.format("DD-MM-YY"));

                    return (
                        <Day day={day} key={idx} rowIdx={i} employeesFilterInfo={employees}/>
                    )
                })}
            </React.Fragment>
            ))}
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

export default Month;