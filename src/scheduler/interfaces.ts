export interface DayEvents  {

}

export interface CustomEvent {
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
    label: string,
    checked: boolean
}

export interface Reformed {

}