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
    {id: 1,firstName:"sam", lastName:"yi", label: "cyan",checked: true},
    {id: 2,firstName: "joe", lastName:"yi", label: "red", checked: true},
    {id: 3,firstName: "mark", lastName:"yi", label: "green", checked: true},
    {id: 4,firstName: "nate", lastName:"yi", label: "slate", checked: true},
    {id: 5,firstName: "jim", lastName:"yi", label: "purple", checked: true},

    {id: 6,firstName: "will", lastName:"yi", label: "blue", checked: true},
    {id: 7,firstName: "kim", lastName:"yi", label: "red", checked: true},
    {id: 8,firstName: "park", lastName:"yi", label: "green", checked: true},
    {id: 9,firstName: "moon", lastName:"yi", label: "slate", checked: true},
    {id: 10,firstName: "chang", lastName:"yi", label: "purple", checked: true},

    {id: 11,firstName: "hwang", lastName:"yi", label: "blue", checked: true},
    {id: 12,firstName: "baek", lastName:"yi", label: "red", checked: true},
    {id: 13,firstName: "yoo", lastName:"yi", label: "green", checked: true},
    {id: 14,firstName: "seo", lastName:"yi", label: "slate", checked: true},
    {id: 15,firstName: "soon", lastName:"yi", label: "purple", checked: true},

    {id: 16,firstName: "kang", lastName:"yi", label: "blue", checked: true},
    {id: 17,firstName: "lee", lastName:"yi", label: "red", checked: true},
    {id: 18,firstName: "she", lastName:"yi", label: "green", checked: true},

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