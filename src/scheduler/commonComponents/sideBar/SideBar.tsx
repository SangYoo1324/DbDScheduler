import React, {useContext} from 'react';
import CreateEventButton from "./CreateEventButton.tsx";
import SmallCalendar from "./SmallCalendar.tsx";
import EmployeePagination from "../EmployeePagination.tsx";
import GlobalContext from "../../context/GlobalContext.ts";
import Search from "./Search.tsx";

function SideBar() {
    const {selectedView} = useContext(GlobalContext);
    return (
        <aside className="border p-5 w-64 h-auto sm:block hidden">
            <CreateEventButton/>
            <SmallCalendar/>
            {(selectedView === "DAY" || selectedView=== "WEEK") && <div className=""><EmployeePagination/></div>}
            {/*{selectedView === "MONTH" || selectedView=== "WEEK"}*/}
            {selectedView === "MONTH" &&<div className="mt-8"> <Search/></div>}
        </aside>
    );
}

export default SideBar;