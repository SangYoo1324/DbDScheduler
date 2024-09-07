import React, {useContext, useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import GlobalContext from "../context/GlobalContext.ts";

function EmployeePagination(props) {
    const {employees,
         displayedEmployees, setDisplayedEmployees,
         pageIndex, setPageIndex} = useContext(GlobalContext);
    const perPage = 5;
    useEffect(()=>{
        const newEmpPageContents = employees.slice(pageIndex*5,pageIndex*perPage+perPage);
        console.log("newEmpPAgeContents", newEmpPageContents, "pageIndex", pageIndex)
        // create dummy employee if needed
        if(newEmpPageContents.length<5){
            const actualEmpLen = newEmpPageContents.length
            console.log("Setting dummy.."+ actualEmpLen)
            for(let d = 0; d< 5-actualEmpLen; d++){
                  console.log("dummyEmployee"+d)
                  newEmpPageContents.push({id:-1000-d, firstName: "dummy", lastName: "dummy", job: "dummy", profile_pic: "dummy"});
              }
        }

        setDisplayedEmployees(newEmpPageContents);
        console.log("초기화:",newEmpPageContents);
        console.log("초기화:", pageIndex)
        setPageIndex(pageIndex)

    }, [pageIndex])

    const handlePageNext = () =>{
        // 마지막 페이지 idx 부터 계산
        const lastPageIdx= Math.floor(employees.length%perPage===0 ?employees.length/perPage-1 : employees.length/perPage);
        
        if(pageIndex<lastPageIdx){ // all the cases (the last page with less than 5 employees & the last page with 5 employees)
            // filter the case when the last page has full employees, if so, don't go to the next page
            if(employees.length%perPage===0 && pageIndex === Math.floor(employees.length/perPage)) return;


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
                <span>{pageIndex*5+1} - {Math.min((pageIndex+1)*5, employees.length)} of {employees.length%5===0 ?Math.floor(employees.length/5):Math.floor(employees.length/5)+1} pages</span>
                <button onClick={handlePageNext}><ChevronRight  className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                </ChevronRight ></button>

            </div>

        </div>
    );
}

export default React.memo(EmployeePagination);