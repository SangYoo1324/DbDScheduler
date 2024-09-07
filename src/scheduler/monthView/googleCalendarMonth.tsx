import CalendarHeader from "./components/CalendarHeader.tsx";
import Month from "./components/Month.tsx";
import React, {useContext, useEffect, useState} from "react";
import {getMonthMatrix} from "../util.ts";
import GlobalContext from "../context/GlobalContext.ts";
import EventModal from "../commonComponents/EventModal.tsx";
import SideBar from "../commonComponents/sideBar/SideBar.tsx";
import ComplexEventModal from "../commonComponents/ComplexEventModal.tsx";


function GoogleCalendarMonth() {

    // get the current Month's date matrix

    const {monthIndex, showEventModal,
        showComplexEventModal
    } = useContext(GlobalContext);


    return (
            <React.Fragment>
                {showEventModal &&<EventModal/>}
                {showComplexEventModal && <ComplexEventModal/>}
                <div className="h-screen w-full flex flex-col">
                    <CalendarHeader/>
                    <div className="flex flex-1 ">
                        <SideBar/>

                        <Month />
                    </div>
                </div>

            </React.Fragment>


    );
}

export default GoogleCalendarMonth;