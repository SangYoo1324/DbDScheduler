import React, {useContext, useEffect} from 'react';
import {employee_colorLabel_by_id, getMonthMatrix, week_days} from "../../util.ts";
import GlobalContext from "../../context/GlobalContext.ts";
import dayjs, { Dayjs } from 'dayjs';
import Day from './Day.tsx';

function Week(props) {
        const{selectedWeekMatrix, savedEvents, 
            displayedEmployees, setDisplayedEmployees,
            pageIndex,
            perPage,
      selectedView} = useContext(GlobalContext);

        // cells array to dynamically generate the table cells for the week according to the number of employees
        const cells = Array.from(({length: displayedEmployees.length*7}), (_,i)=> i)


        useEffect(()=>{
console.log("displayedEmployees:", displayedEmployees);
  

            if(selectedWeekMatrix && selectedWeekMatrix.length>0){
                  
                  console.log((selectedWeekMatrix[0] as Dayjs).format("DD-MM-YY"));
            }
      

        },[selectedWeekMatrix, displayedEmployees, selectedView])


      



    return (
          // flex-1 is required to take all the space to the end of the x-axis
                <div className="flex flex-1 flex-col overflow-x-auto">

                <div className="grid grid-cols-1/5 border min-w-[720px]">
                        <div></div>
                {selectedWeekMatrix && selectedWeekMatrix.length>0 && (
                  <div className="grid grid-cols-7 grid-rows-1 text-center">
                      <div className="p-2 text-gray-500 border-x"> {week_days[selectedWeekMatrix[0].day()]} ({(selectedWeekMatrix[0] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500 border-x">{week_days[selectedWeekMatrix[1].day()]} ({(selectedWeekMatrix[1] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500 border-x">{week_days[selectedWeekMatrix[2].day()]} ({(selectedWeekMatrix[2] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500 border-x">{week_days[selectedWeekMatrix[3].day()]} ({(selectedWeekMatrix[3] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500 border-x">{week_days[selectedWeekMatrix[4].day()]} ({(selectedWeekMatrix[4] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500 border-x">{week_days[selectedWeekMatrix[5].day()]} ({(selectedWeekMatrix[5] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                      <div className="p-2 text-gray-500 border-x">{week_days[selectedWeekMatrix[6].day()]} ({(selectedWeekMatrix[6] as Dayjs).format("DD-MM-YY").slice(0,2)})</div>
                </div>

                )}
                </div>
        
          
                 <div className="grid grid-cols-1/5 flex-1 min-w-[720px]">
                   {/* Employees  */}
                        <div className={`grid grid-cols-1 h-[80vh]`}>
                              {/* Employees row  */}
                        {
                   displayedEmployees.map((em,i)=>( <div className={`p-2 box-border overflow-hidden
                   flex items-center justify-around border-b bg-${em.id>0 ?employee_colorLabel_by_id[em.id%5]: 'gray'}-100 text-gray-700 flex-1`} key={i}>
                        {em.id>0 && <img
                            className='w-10 h-10 rounded-full'
                            src={em.profile_pic} alt="" />}
                        
                        <div className='flex flex-col items-around flex-grow'>
                        <span className='font-bold text-gray-800 text-center truncate'>{em.id>0 ? `${em.firstName} ${em.lastName}`: "Non-Assigned"}</span>
                        <span className='text-gray-500 text-center truncate'>{em.id>0 ? `${em.job}`: "Non-Assigned"}</span>
                        </div>
                       
                        </div>))     
                 } 
                        </div>  

                  {/* actual employee schedule  */}
                        <div  className={`grid grid-cols-7 grid-rows-${perPage} h-[80vh]`}>

                              {/* 7*employees.length cells to be generated dynamically */}
                              {selectedWeekMatrix && cells.map((s,i)=>{
                                return <>
                                      <Day key={i} index={i} employee={displayedEmployees[Math.floor(i / 7)]} day={selectedWeekMatrix[i % 7]}
                                      events={savedEvents.filter(e => {

                                            return dayjs(e.day).isSame(selectedWeekMatrix[i % 7], 'year') && dayjs(e.day).isSame(selectedWeekMatrix[i % 7], 'day')
                                                  // employee id 일치 여부
                                                  && e.employee.id === displayedEmployees[Math.floor(i / 7)].id;
                                      })}/>
                                </>
                              })}
                             

                           

                            


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

export default Week;