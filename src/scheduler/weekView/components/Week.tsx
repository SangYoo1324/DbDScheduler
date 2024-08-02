import React, {useContext, useEffect} from 'react';
import {getMonthMatrix} from "../../util.ts";
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
                      <div className="p-2 text-gray-500">SUN ({(selectedWeekMatrix[0] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500">MON ({(selectedWeekMatrix[1] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500">TUE ({(selectedWeekMatrix[2] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500">WED ({(selectedWeekMatrix[3] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500">THU ({(selectedWeekMatrix[4] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500">FRI ({(selectedWeekMatrix[5] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500">SAT ({(selectedWeekMatrix[6] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                </div>

                )}
                </div>
        

                 <div className="grid grid-cols-1/5 flex-1 min-w-[720px]">
                        <div className={`text-center`}>
                              {/* Employees row  */}
                        {
                   employees.map((em,i)=>( <div className={`flex items-center justify-center border-b bg-${em.label}-500 text-gray-700 h-16`} key={i}>{em.firstName} {em.lastName}</div>))     
                 } 
                        </div>  

                  {/* actual employee schedule  */}
                        <div  className={`grid grid-cols-7 grid-rows-${employees.length}`}>

                              {/* 7*employees.length cells to be generated dynamically */}
                              {selectedWeekMatrix && sample.map((s,i)=>{
                                return < >
                                      <Day key={i} index={i} employee={employees[Math.floor(i/7)]} day={selectedWeekMatrix[i%7]} 
                                      events={savedEvents.filter(e=> { 
                                          console.log("filter true", dayjs(e.day).format("DD-MM-YY")+"/" +selectedWeekMatrix[i%7]?.format("DD-MM-YY"));

                                          return dayjs(e.day).isSame(selectedWeekMatrix[i%7], 'year') && dayjs(e.day).isSame(selectedWeekMatrix[i%7], 'day')
                                          // employee id 일치 여부
                                          && e.employee.id === employees[Math.floor(i/7)].id }) }/>
                                </>
                              })}
                             

                           

                            


                                </div>        
                </div>       
             
                

                </div>




    );
}

export default Week;