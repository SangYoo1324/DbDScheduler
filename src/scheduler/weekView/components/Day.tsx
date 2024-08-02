import React, { useEffect } from 'react';

//Week view of the calendar, detail of the Each cell
function Day({employee, events, index, day}) {

    // useEffect(()=>{
    //     console.log("events",events);
    // },[]);
    

    return (
        <div className="text-center border border-gray-300 h-16 hover:cursor-pointer flex items-center justify-center m-[2px]">
            {
                employee && <div className='w-full h-full flex flex-col items-center justify-center'>
                    {events.map((e, i)=>{
                        return <div key={i} className={`text-gray-500 bg-${e.employee.label}-500 rounded-sm my-[1px] w-11/12 flex-grow text-center`}>{e.title}</div>
                    })}
                </div>
            }
        </div>
    );
}

export default Day;