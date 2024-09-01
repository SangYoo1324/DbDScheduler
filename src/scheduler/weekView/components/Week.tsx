import React, {useContext, useEffect} from 'react';
import {employee_colorLabel_by_id, getMonthMatrix} from "../../util.ts";
import GlobalContext from "../../context/GlobalContext.ts";
import dayjs, { Dayjs } from 'dayjs';
import Day from './Day.tsx';

function Week(props) {
        const{monthMatrix, employees, selectedWeekMatrix, savedEvents} = useContext(GlobalContext);

        // sample array to dynamically generate the table cells for the week according to the number of employees
        const sample = Array.from(({length: employees.length*7}), (_,i)=> i)


        useEffect(()=>{
            if(selectedWeekMatrix && selectedWeekMatrix.length>0){
                  
                  console.log((selectedWeekMatrix[0] as Dayjs).format("DD-MM-YY"));
            }
      
        },[selectedWeekMatrix])


        // Event Related
        useEffect(()=>{
            console.log("savedEvents", savedEvents);
        });

      

    return (
          // flex-1 is required to take all the space to the end of the x-axis
                <div className="flex flex-1 flex-col overflow-x-auto">

                <div className="grid grid-cols-1/5 border min-w-[720px]">
                        <div></div>
                {selectedWeekMatrix && selectedWeekMatrix.length>0 && (
                  <div className="grid grid-cols-7 grid-rows-1 text-center">
                      <div className="p-2 text-gray-500 border-x">SUN ({(selectedWeekMatrix[0] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500 border-x">MON ({(selectedWeekMatrix[1] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500 border-x">TUE ({(selectedWeekMatrix[2] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500 border-x">WED ({(selectedWeekMatrix[3] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500 border-x">THU ({(selectedWeekMatrix[4] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500 border-x">FRI ({(selectedWeekMatrix[5] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500 border-x">SAT ({(selectedWeekMatrix[6] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                </div>

                )}
                </div>
        
            {/* Employees  */}
                 <div className="grid grid-cols-1/5 flex-1 min-w-[720px]">
                        <div className={`grid grid-cols-1 h-[95vh]`}>
                              {/* Employees row  */}
                        {
                   employees.map((em,i)=>( <div className={`flex items-center justify-around border-b bg-${employee_colorLabel_by_id[em.id%5]}-500 text-gray-700 flex-1`} key={i}>
                           
                        <img
                            className='w-10 h-10 rounded-full'
                            src="https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/09916c28-9bcc-47c4-bc9b-400bb57f3b99.png" alt="" />
                        
                        <div className='flex flex-col items-center'>
                        <span className='text-gray-100'>{em.firstName} {em.lastName}</span>
                        <span className='text-gray-500'>{em.job}</span>
                        </div>
                       
                        </div>))     
                 } 
                        </div>  

                  {/* actual employee schedule  */}
                        <div  className={`grid grid-cols-7 grid-rows-${employees.length} h-[95vh]`}>

                              {/* 7*employees.length cells to be generated dynamically */}
                              {selectedWeekMatrix && sample.map((s,i)=>{
                                return <>
                                      <Day key={i} index={i} employee={employees[Math.floor(i / 7)]} day={selectedWeekMatrix[i % 7]}
                                      events={savedEvents.filter(e => {

                                            return dayjs(e.day).isSame(selectedWeekMatrix[i % 7], 'year') && dayjs(e.day).isSame(selectedWeekMatrix[i % 7], 'day')
                                                  // employee id 일치 여부
                                                  && e.employee.id === employees[Math.floor(i / 7)].id;
                                      })}/>
                                </>
                              })}
                             

                           

                            


                                </div>        
                </div>       
             
                

                </div>




    );
}

export default Week;