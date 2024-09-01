import dayjs, { Dayjs } from 'dayjs';

export function getMonthMatrix(month = dayjs().month()){
    const year = dayjs().year()
    const firstDayOfMonth = dayjs(new Date(year, month, 1)).day(); // 0~6 mon~sun

    let currentMonthCount = 0-firstDayOfMonth; // if it strarts after Sunday, it will be - value
    return new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++;
            return dayjs(new Date(year, month, currentMonthCount));
        })
    });
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

];

export const findNthOfTheWeek = (daySelected: Dayjs)=>{  
    const startOfMonth = daySelected.startOf('month');
// 해당 월의 1일이 속한 주의 시작일 찾기(일요일)
const startOfFirstWeek = startOfMonth.startOf('week');
console.log("startOfFirstWeek",startOfFirstWeek);

// week index of daySelected - startOfFirstWeek's week index
 const weekIndex= daySelected.diff(startOfFirstWeek, 'week');

console.log("week index", weekIndex);
return weekIndex;
}

export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


export const employee_colorLabel_by_id = ["blue", 'red','green', 'orange','gray' ]