import React, { useContext, useEffect } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { Badge, IconButton, styled } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import ExpandModal from '../../commonComponents/ExpandModal';
import { employee_colorLabel_by_id } from '../../util';

 

//Week view of the calendar, detail of the Each cell
const CustomIconButton = styled(IconButton)({
    padding: 0,
  });


function Day({employee, events, index, day}) {


        const {setOpenExpandModal, setDaySelected, openExpandModal, daySelected, selectedEmployee,setSelectedEvent, setSelectedEmployee, setShowEventModal}= useContext(GlobalContext);
        useEffect(()=>{
            console.log("events", events);
        },[])


        const handleOpenExpandModal = (event)=>{
            event.stopPropagation();
            console.log(openExpandModal);
            setDaySelected(day);
            setSelectedEmployee(employee);
            setOpenExpandModal(true);
        }


    return (
        <div
        onClick={()=>{
            setDaySelected(day);
            setSelectedEmployee(employee);
            setShowEventModal(true);
            console.log("clicked day");
        }} 
        className="text-center border border-gray-300 hover:cursor-pointer flex items-center justify-center relative h-full">
            {
                employee && <div className='flex flex-col items-center justify-center absolute w-[100%]'>
                    {events.map((e, i)=>{
                        if(i>1){ // 2개까지는 생성하고 , 이후에는  expandModal
                            return ;
                        }else 
                        return <div
                        onClick={(event)=> {
                    
                            setSelectedEmployee(e.employee);
                            setSelectedEvent(e);
                            setShowEventModal(true);
                            console.log("clicked event", e);
                        }}
                        key={i} className={`text-gray-100 bg-${employee_colorLabel_by_id[e.employee.id]}-500 rounded-sm overflow-hidden text-center w-[100%] mb-[1px] p-1
                        ${events.length>2 && i>0 ? 'hidden': ''}
                            `}>{`${e.startTime} - ${e.endTime}`}</div>
                    })}

                    {/* ExpandModal Button */}
                    <div onClick={handleOpenExpandModal} className={`bg-gray-200 text-gray-600 text-sm rounded-sm text-center font bold w-full
                        ${events.length>2 ? '' : 'hidden'}`}>
                    <CustomIconButton  color="primary">
                    <Badge badgeContent={events.length-1} color="error" className="z-0 p-0" >
                       <MoreHoriz />
                    </Badge>
                </CustomIconButton>
               
                    </div>
                    {openExpandModal && daySelected.format("MM-DD-YY")===day.format("MM-DD-YY") &&  selectedEmployee.id === employee.id && <ExpandModal  events={events}/>}
                </div>
                
            }
           
        </div>
    );
}

export default Day;