import React, { useContext } from 'react';
import Week from "./components/Week.tsx";
import WeekCalendarHeader from "./components/WeekCalendarHeader.tsx";
import SideBar from '../commonComponents/sideBar/SideBar.tsx';
import { Global } from '@emotion/react';
import GlobalContext from '../context/GlobalContext.ts';
import EventModal from '../commonComponents/EventModal.tsx';

function GoogleCalendarWeek(props) {
    const {showEventModal} = useContext(GlobalContext);
    return (
        <React.Fragment>
            {showEventModal ?? <EventModal/>}
            <div className="h-screen w-full flex flex-col">
            <WeekCalendarHeader/>
            <div className="flex">
            <SideBar/>
            <Week/>
            </div>
            </div>

        </React.Fragment>

    );
}

export default GoogleCalendarWeek;