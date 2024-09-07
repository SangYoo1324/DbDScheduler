import React, {useContext, useEffect, useRef, useState} from 'react';
import GoogleCalendarMonth from "./monthView/googleCalendarMonth.tsx";
import GoogleCalendarWeek from "./weekView/GoogleCalendarWeek.tsx";
import GoogleCalendarDay from "./dayView/GoogleCalendarDay.tsx";
import GlobalContext from "./context/GlobalContext.ts";
import { DefaultView } from './GlobalVar.ts';

// Dashboard panel having view selector. 
function Top_Panel(props) {
    const {selectedView, setSelectedView,
            setSelectedTimeFrames,
            setSelectedTimeFrame,
            setDisplayedEmployees
    } = useContext(GlobalContext);
    const selectRef = useRef(null);


    useEffect(() => {
        // Set initial state from the select element's default value
        if (selectRef.current) {
            setSelectedView(DefaultView);
            selectRef.current.value.toUpperCase();
            setSelectedTimeFrames([]);
            setSelectedTimeFrame('');
        }
    }, []);

    const handleChange = (event) => {

        setSelectedView(event.target.value.toUpperCase());
    };
    return (
        <div>
            <header className="w-full h-[3rem] bg-blue-300 flex justify-between">

                <div className="flex justify-center items-center">
                    <h2 className="text-2xl text-gray-600 font-bold ml-3">Dashboard</h2>
                </div>

                <div className="flex justify-center items-center mr-2">
                    <select id="options"
                            value={selectedView}
                            onChange={handleChange}
                            ref={selectRef}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-100 text-gray-700 font-semibold">
                        <option value="MONTH" className="text-l text-gray-500">Month View</option>
                        <option value="WEEK" className="text-l text-gray-500">Week View</option>
                        <option value="DAY" className="text-l text-gray-500">Day View</option>
                    </select>
                </div>

            </header>
            {selectedView === "MONTH" && <GoogleCalendarMonth/>}
            {selectedView === "WEEK" && <GoogleCalendarWeek/>}
            {selectedView === "DAY" && <GoogleCalendarDay/>}

        </div>
    );
}

export default Top_Panel;