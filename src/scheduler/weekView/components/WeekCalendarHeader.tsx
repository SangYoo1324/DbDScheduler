import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import logo from '../../assets/scheduler_logo.png'
import GlobalContext from '../../context/GlobalContext';
import EmployeePagination from '../../commonComponents/EmployeePagination';
import { ChevronLeft, ChevronRight, ClassSharp, SettingsSystemDaydreamSharp } from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';
import { findNthOfTheWeek, findWeekIdxOfPPMonthMatrix, getPPMonthMatrix, getRelativeMonthIndex, monthNames } from '../../util';
import { set } from 'react-hook-form';
import { payPeriod } from '../../GlobalVar';
function WeekCalendarHeader(props: any) {

    // if currentMonthMatrix's last Index contains only next month's days, set hasPureNextMonthWeekMatrix to true 
    const [isTodayButtonClicked, setIsTodayButtonClicked] = useState(false);
    const [isInit, setIsInit] = useState(true);
   const {monthIndex, setMonthIndex,
     daySelected, setDaySelected,
      PPweekIndex, setWeekIndex,
       setSelectedWeekMatrix, selectedWeekMatrix,
       isSmallCalendarClicked, setIsSmallCalendarClicked,
    ppMonthMatrix,setPPMonthMatrix} = useContext(GlobalContext);

   // set initial state of PPweekIndex
   useEffect(()=>{
   
    // monthIndex는 글로벌 하므로 조정 필요 x
    console.log("초기화 시 monthIndex:::", monthIndex);  
    console.log("초기화 시 PPweekIndex::::", PPweekIndex);
    console.log("초기화 시 ppMonthMatrix::", ppMonthMatrix);
    console.log("초기화 시 daySelected::", daySelected);
   },[]);




   // todayButton click 되면 PPweekIndex를 오늘의 주로 변경
   useEffect(()=>{
    if(isTodayButtonClicked){
        
        setWeekIndex(findWeekIdxOfPPMonthMatrix(getPPMonthMatrix(dayjs().month(),payPeriod)));
        setIsTodayButtonClicked(false);
    }
   },[isTodayButtonClicked])


   // view 변경 시 monthIndex가 변경이 안되기 때문에 monthIndex 트리거 useEffect 대신에 isInit 을 쓰자
   // view 변경 시에는 week관련 state가 업데이트 된다는 보장이 없기 때문에 초기화가 필요함
   useEffect(()=>{

    console.log("init payperiodMonthMatrix useEffect()", ppMonthMatrix);
    if(isInit){
        let initWeekIndex = findWeekIdxOfPPMonthMatrix(getPPMonthMatrix(daySelected.month(),payPeriod), daySelected)
        
        setWeekIndex(initWeekIndex? initWeekIndex: PPweekIndex);
        setSelectedWeekMatrix(initWeekIndex? initWeekIndex: PPweekIndex)
        setIsInit(false);
    }
   }, [isInit])  

   // Triggered when month Index changes, update the selectedPayPeriodMonthMatrix, and then handle PPweekIndex
   useEffect(()=>{
    console.log("monthIndex useEffect()", monthIndex);
   
    const nextMonthPayPeriodMonthMatrix = getPPMonthMatrix(monthIndex, payPeriod);
    console.log("nextMonthPayPeriodMonthMatrix", nextMonthPayPeriodMonthMatrix);

            setPPMonthMatrix(nextMonthPayPeriodMonthMatrix); 
    
   }, [monthIndex]);



   // Reset the WeekIndex to today's week. 
   const handleReset = ()=>{
    setMonthIndex(dayjs().month()); // month가 먼저 변경되니 monthIndex 관련 useEffect가 먼저 발동
    // PPweekIndex는 useEffect에서 처리해야 monthTable이 바뀌고 나서 처리 가능
    setIsTodayButtonClicked(true); // month가 변경되있는 상태일 때 PPweekIndex 변경을 트리거
   }

   const handlePrevWeek = ()=>{
    if(PPweekIndex === 0) {
        setMonthIndex(monthIndex-1);
        // week 처리는 useEffect에서
        console.log("change Month")
        return;
    }
        // month가 바뀌면서 weekTable이 바뀌지 않는겨우 걍 PPweekIndex만 변경
        setWeekIndex(PPweekIndex-1);
    
    console.log("prev:", PPweekIndex);
   }

   const handleNextWeek = ()=>{
    console.log("next:", PPweekIndex);
    if(PPweekIndex === 5){
        setMonthIndex(monthIndex+1);
        console.log("change Month")
        // week 0 처리는 useEffect에서 
        return;
    } 
    // month가 바뀌면서 weekTable이 바뀌지 않는겨우 걍 PPweekIndex만 변경
        setWeekIndex(PPweekIndex+1);  
   }


   // If ppMonthMatrix changed by daySelected, update the PPweekIndex.
   useEffect(()=>{
    //현재 날짜로 이동 시 그냥 monthMatrix만 업데이트 하고 아무 액션도 취하지 않음(PPweekIndex를 month에 따라 변경해줄 필요가 없음)
    if(isTodayButtonClicked) {
        setPPMonthMatrix(ppMonthMatrix);  return;
    }

    if(PPweekIndex===5){
     
        const prevMonthPayPeriodMatrix = getPPMonthMatrix(monthIndex-1, payPeriod);
        let overlapping = 0;
        // 2주 겹치는 경우  체크
        for(let i =0; i<2; i++){
            console.log("next 비교:",ppMonthMatrix[i][0].format('DD-MMM-YYYY'), prevMonthPayPeriodMatrix[i+4][0].format('DD-MMM-YYYY'));
                if(ppMonthMatrix[i][0].isSame(prevMonthPayPeriodMatrix[i+4][0], 'day')){
                    console.log(`전 달의 ${5-i} 주와 이번 달의 ${i} 주가 겹칩니다.`);
                    overlapping++;
            }
            
    }
    // 1주만 겹치는 경우 체크
    if(overlapping === 0){
        if(ppMonthMatrix[0][0].isSame(prevMonthPayPeriodMatrix[5][0], 'day')){
            overlapping++;
        }
    }

    console.log("overlapping", overlapping);

    setWeekIndex(overlapping);
    }


    if(PPweekIndex===0){
        const prevMonthPayPeriodMatrix = getPPMonthMatrix(monthIndex+1, payPeriod);
        let overlapping = 0;
        
// 2주 겹칠 경우
        for(let i =0; i<2; i++){
            console.log("prev 비교:",ppMonthMatrix[i+4][0].format('DD-MMM-YYYY'), prevMonthPayPeriodMatrix[i][0].format('DD-MMM-YYYY'));
                if(ppMonthMatrix[i+4][0].isSame(prevMonthPayPeriodMatrix[i][0], 'day')){
                    
                    overlapping++;
            }
    }
//1주만 겹칠 경우
    if(overlapping === 0){
        if(ppMonthMatrix[5][0].isSame(prevMonthPayPeriodMatrix[0][0], 'day')){
            overlapping++;
        }
    }
    console.log("prev overlapping", overlapping);
    setWeekIndex(5-overlapping);

    }
    // daySelected가 바뀔때
    // month까지 바뀌는 경우
    if(isSmallCalendarClicked){
        console.log("smallCalendar Click Process")
        console.log("ppMonthMatrix", ppMonthMatrix);
        setWeekIndex(findWeekIdxOfPPMonthMatrix(ppMonthMatrix, daySelected));
        setIsSmallCalendarClicked(false);
    }
  
   },[ppMonthMatrix]);

   // handling small calendar dayselected Change
   useEffect(()=>{
    if(isSmallCalendarClicked){
        setWeekIndex(findWeekIdxOfPPMonthMatrix(ppMonthMatrix, daySelected));
    }

   },[daySelected])


     // If week index changes, update the selectedWeekMatrix
     // 이 useEffect 은 monthIndex가 변경된 후에 실행되게 설계되어 있음
     useEffect(()=>{
        const newWeekMatrix = ppMonthMatrix[PPweekIndex]
        setSelectedWeekMatrix(prev=>{
            return newWeekMatrix;
        });
        // weekIndex가 이동함에 따라 daySelected도 변경
        setDaySelected(newWeekMatrix[0]);
        
       }, [PPweekIndex]);
    

  

    return (
        <header className="px-4 py-2 sm:flex block items-center">
            <div className="flex items-center">
                <img src={logo} alt="" className="mr-2 w-12 h-12"/>
                <h1 className="sm:mr-10 text- xl text-gray-500 font-bold">Week View</h1>
                
            </div>

            <div className="flex items-center">
                <button onClick={handleReset}  className="border rounded py-2 px-4 mr-5">Today</button>

                <button onClick={handlePrevWeek}><ChevronLeft className="material-icons-outlined cursor-pointer text-gray-600 mx-2">

                </ChevronLeft></button>
                <button onClick={handleNextWeek}><ChevronRight  className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                </ChevronRight ></button>

                <h2 className="ml-4 text-xl text-gray-500 font-bold"
                >{}</h2>
            </div>

            {
           selectedWeekMatrix && <div className="ml-4 text-xl text-gray-500 font-bold"> {`${(selectedWeekMatrix[0] as Dayjs)?.format('DD-MMM-YYYY')} - ${(selectedWeekMatrix[6] as Dayjs)?.format('DD-MMM-YYYY')}`}</div>
            }

        </header>

    );
}

export default WeekCalendarHeader;