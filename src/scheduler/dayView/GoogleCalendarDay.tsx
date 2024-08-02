import React, {useContext} from 'react';
import DayCalendarHeader from "./components/DayCalendarHeader.tsx";
import Day from "./components/Day.tsx";
import SideBar from "../commonComponents/sideBar/SideBar.tsx";
import EventModal from "../commonComponents/EventModal.tsx";
import GlobalContext from "../context/GlobalContext.ts";

function GoogleCalendarDay(props) {
    const {showEventModal} = useContext(GlobalContext);
    return (
        <div>
            {showEventModal &&<EventModal/>}
            <div className="h-screen w-full flex flex-col">
                <DayCalendarHeader/>
                <div className="flex flex-1">
                    <SideBar/>
                    <Day/>
                </div>
            </div>



        

        </div>
    );
}

export default GoogleCalendarDay;