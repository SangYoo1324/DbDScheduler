import dayjs, { Dayjs } from 'dayjs';

// 달력용 MonthMatrix 생성
export function getMonthMatrix(month = dayjs().month()){
    const year = dayjs().year()
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day(); // 0~6 sun~sat

    let currentMonthCount = 0-firstDayOfMonth; // if it strarts after Sunday, it will be - value
    return new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        })
    });
}

// payPeriod Month Matrix(PayPeriod start에 따라 다르게 생성)
export function getPPMonthMatrix(month = dayjs().month(), startOfWeek = 4) { // 기본 목요일 스타트

    // 해당 월의 첫 번째 날짜가 무슨 요일인지 확인 (0 = 일요일, 6 = 토요일)
    const firstDayOfMonth = dayjs().add(month - dayjs().month(), 'month').date(1).day();
    const year = month >11 ?  dayjs().year()+ Math.floor(month/12) : dayjs().year(); 
    // 주 시작 요일을 반영하여 카운트를 조정 (startOfWeek를 기준으로 이동)
    let currentMonthCount = 0 - ((firstDayOfMonth - startOfWeek + 7) % 7);
    // 6주(42일)짜리 매트릭스 생성
    return new Array(6).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month%12, currentMonthCount));
        });
    });
}


// get the index of the month relative to the current month  (12~ )
export function getRelativeMonthIndex(day:Dayjs){
  
    return (day.year()-dayjs().year())*12+day.month();
}

export const colorClasses = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    cyan: 'bg-cyan-500',
    purple: 'bg-purple-500'
    // 필요한 모든 색상을 여기에 추가합니다.
};


export const sampleEmployees = [
    {id: 1,firstName:"sam", lastName:"yin", label: "cyan",checked: true, job: "Product Manager" ,profile_pic:"https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/default_selfie.png"},
    {id: 2,firstName: "joe", lastName:"yid", label: "red", checked: true, job: "Product Manager" ,profile_pic:"https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/default_selfie.png"},
    {id: 3,firstName: "mark", lastName:"yia", label: "green", checked: true, job: "Software Engineer" , profile_pic:"https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/default_selfie.png"},
    {id: 4,firstName: "nate", lastName:"yif", label: "slate", checked: true, job: "Software Engineer" , profile_pic:"https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/default_selfie.png"},
    {id: 5,firstName: "jane", lastName:"yic", label: "purple", checked: true, job: "Software Engineer 2" , profile_pic:"https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/default_selfie.png"},

    {id: 6,firstName: "will", lastName:"yiv", label: "blue", checked: true, job: "System Admin" , profile_pic:"https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/default_selfie.png"},
    {id: 7,firstName: "kim", lastName:"yic", label: "red", checked: true, job: "Software Engineer 2" , profile_pic:"https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/default_selfie.png"},
    {id: 8,firstName: "park", lastName:"yis", label: "green", checked: true, job: "IT Specialist" , profile_pic:"https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/default_selfie.png"},
    {id: 9,firstName: "moon", lastName:"yib", label: "slate", checked: true, job: "Security Analyst" , profile_pic:"https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/default_selfie.png"},
    {id: 10,firstName: "chang", lastName:"yee", label: "purple", checked: true, job: "Support Engineer" , profile_pic:"https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/default_selfie.png"},
    {id: 11,firstName: "yoon", lastName:"yee", label: "purple", checked: true, job: "Support Engineer II" , profile_pic:"https://sammyoopublicbucket.s3.us-west-2.amazonaws.com/default_selfie.png"},

];


export const findNthOfTheWeek = (daySelected: Dayjs)=>{  
    // 해당 주의 시작일 찾기(dayjs object) - why? 해당 선택 일의 주의 시작일이 전 월일  경우(ex: 9월 2일이 화욜인데, 8월 31일이 일요일인 경우)
    const startOfCurrentWeek= daySelected.startOf('week');
    // 해당 주의 시작일의 해당 월 찾기
    const startOfMonth = startOfCurrentWeek.startOf('month');

// 해당 월의 1일이 속한 주의 시작일 찾기(dayjs object)
const startOfFirstWeek = startOfMonth.startOf('week');
console.log("startOfFirstWeek",startOfFirstWeek);

// week index of daySelected - startOfFirstWeek's week index
 const PPweekIndex= daySelected.diff(startOfFirstWeek, 'week');

console.log("week index", PPweekIndex);
return PPweekIndex;
}


// 오늘, 혹은 특정 날짜가 몇번째 주인지 찾기 (PPmonthMatrix가 필요함)
export const findWeekIdxOfPPMonthMatrix = (matrix, day= dayjs())=>{
    for(let i = 0; i< matrix.length; i++){
        for(let j = 0; j< matrix[i].length; j++){
            if(matrix[i][j].isSame(day, 'day')){
                return i;
            }
        }
    }

}



export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const week_days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const employee_colorLabel_by_id = ["blue", 'red','green', 'orange','gray' ]


export const indexToTime =  (index:number, isStart)=>{
    if(index>=95) return "00:00";
    const totalMinutes =  (isStart? index: index+1) * 15; // 15분 단위
    const hours24 = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
   
    return `${hours24.toString().padStart(2,'0')}:${minutes.toString().padStart(2, '0')}`;
}

export const timeToIndex= (time:string)=>{
    const [hours, minutes] = time.split(":");
    return parseInt(hours) * 4 + parseInt(minutes) / 15;
}