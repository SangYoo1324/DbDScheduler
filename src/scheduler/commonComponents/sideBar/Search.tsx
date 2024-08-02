import React, {useContext, useState} from 'react';
import {RestartAlt, Restore, RestoreOutlined, SearchRounded} from "@mui/icons-material";
import GlobalContext from "../../context/GlobalContext.ts";
function Search(props) {

    const {employees ,setEmployees, setPageIndex, selectedView} = useContext(GlobalContext);


    const [isFocused, setIsFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployeeBySearch, setSeletedEmployeeBySearch] = useState(null);
    
    const handleFocus = ()=>{
        setIsFocused(true);
    }

    const handleBlur = ()=>{
         setIsFocused(false);
    }
    
    const handleSelect = (employee) =>{
        setSeletedEmployeeBySearch(employee);
        console.log("Employee Selected to filter: ", employee)
        setIsFocused(false);
        console.log('====================================');
        console.log(selectedView);
        console.log('====================================');
        switch(selectedView){
            case "MONTH": {
                // 해당 검색결과 제외 모든 유저 checked false, 해당 검색결과는 전에 false였다면 true로 변환
             const checkedFilter = employees.map(em=>{
                if(em.id !== employee.id){
                    return {...em, checked: false} 
                }
                else if(em.id=== employee.id)
                return {...em, checked: true} ;
            else return em;
             });

             console.log("employees after filter:", checkedFilter)
    
               setEmployees(checkedFilter) ;
               setSearchTerm(employee.firstName+" "+employee.lastName);
                break;
            }
            case "DAY":{

                break;
            }
            case "WEEK":{
                
                break;
            }
            default: {
              console.log("Default View");
            }
        }
    }

    const handleChange = (event)=>{
        setSearchTerm(event.target.value);
    }

    const handleReset = ()=>{
        setEmployees(employees.map(em=> { return {...em, checked: true}}));
        setSearchTerm('');
    }

    const filteredEmployees = employees.filter((employee)=>{
        return employee.firstName.toLowerCase().includes(searchTerm.toLowerCase());
    })


    return (
        <div className="flex items-center w-full max-w-lg mx-auto">
            <div className="relative w-full mr-2">
            <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-1 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                value={searchTerm}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <SearchRounded  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            {
                isFocused && (
                    <ul className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                        {filteredEmployees.map((em, index)=>(
                            <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onMouseDown={()=> handleSelect(em)}
                            >{`${em.firstName} ${em.lastName}`}</li>
                        ))}
                    </ul>
                )
            }
        </div>
        <button><RestartAlt onClick={handleReset}/></button>
            </div>
           
    );
}

export default Search;