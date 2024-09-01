export interface DayEvents  {

}

export interface Event {
    id: number,
    day: number, // timestamp value
    description: string,
    startTime: string, // 13:30
    endTime: string, // 15:30
    title: string,
    employee: Employee
}


export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    job: string,
    profile_pic: string
    label: string,
    checked: boolean,
}

export interface Reformed {

}