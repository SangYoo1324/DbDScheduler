import React, {useContext, useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import GlobalContext from "../context/GlobalContext.ts";

function EmployeePagination(props) {
    const {employees, displayedEmployees, setDisplayedEmployees, pageIndex, setPageIndex} = useContext(GlobalContext);
    const perPage = 5;
    useEffect(()=>{
        setDisplayedEmployees(employees.slice(0,perPage));
        console.log("초기화:",employees.slice(0,perPage));
    }, [employees])

    const handlePageNext = () =>{
        if(pageIndex<Math.floor(employees.length/perPage)){
            setDisplayedEmployees(employees.slice((pageIndex+1)*5,(pageIndex+2)*5));
            setPageIndex(pageIndex+1);
            console.log("employees after handlePageNext:" , employees.slice((pageIndex+1)*5,(pageIndex+2)*5));
        }
    }

    const handlePagePrev = ()=>{
        if(pageIndex>0){
            setDisplayedEmployees(employees.slice((pageIndex-1)*5,pageIndex*5));
            setPageIndex(pageIndex-1);
            console.log("employees after handlePageNext:" , employees.slice((pageIndex-1)*5,(pageIndex)*5));
        }
    }

    return (
        <div className="sm:mt-8">
            <h1 className="text-center sm:mb-3">Employee Display Control</h1>
            <div className="flex justify-center">

                <button onClick={handlePagePrev}><ChevronLeft className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                </ChevronLeft></button>
                <span>{pageIndex*5+1} - {Math.min((pageIndex+1)*5, employees.length)} of {Math.floor(employees.length/5)+1} pages</span>
                <button onClick={handlePageNext}><ChevronRight  className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                </ChevronRight ></button>

            </div>

        </div>
    );
}

export default EmployeePagination;