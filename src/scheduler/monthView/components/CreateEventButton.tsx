import React, {useContext} from 'react';
import GlobalContext from "../../context/GlobalContext.ts";

function CreateEventButton() {
    const {showEventModal, setShowEventModal} = useContext(GlobalContext);
    return (
        <button className="border p-1 rounded-full flex items-center shadow-md hover:shadow-2xl"
        onClick={()=>{setShowEventModal(true)}}>
            <span className="text-[1.5rem] ml-[1rem] mr-[0.5rem]"><b>+</b></span>
            <span className="pl-3 pr-5"> Create</span>
        </button>
    );
}

export default CreateEventButton;