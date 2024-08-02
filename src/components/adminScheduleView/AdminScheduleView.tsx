import {
    Agenda,
    Day,
    EventSettingsModel,
    Inject,
    Month, ResourceDirective, ResourcesDirective,
    ScheduleComponent, TimelineMonth,
    Week,
    WorkWeek
} from "@syncfusion/ej2-react-schedule";

function AdminScheduleView() {

    const data: EventSettingsModel['dataSource'] =
        [
            {
                Id: 1,
                Subject: 'Meeting',
                StartTime: new Date(2024, 4, 15, 10, 0),
                EndTime: new Date(2024, 4, 16, 12, 30),
                Owner: 'Alice',
                OwnerId: 1
            },
            {
                Id: 1,
                Subject: 'Meeting',
                StartTime: new Date(2024, 4, 15, 10, 0),
                EndTime: new Date(2024, 4, 16, 12, 30),
                Owner: 'John',
                OwnerId: 2
            },
            {
                Id: 1,
                Subject: 'Meeting',
                StartTime: new Date(2024, 4, 15, 10, 0),
                EndTime: new Date(2024, 4, 16, 12, 30),
                Owner: 'Bob',
                OwnerId: 3
            },
    ]

    // 리소스 데이터 설정
    const ownerData = [
        { Text: 'Alice', Id: 1, Color: '#1aaa55' },
        { Text: 'Bob', Id: 2, Color: '#7fa900' },
        { Text: 'John', Id: 3, Color: '#ea7a57' },
    ];


    return (
        <div>
            <ScheduleComponent currentView='TimelineMonth' eventSettings={{dataSource: data}}>
                <ResourcesDirective>
                    <ResourceDirective field='OwnerId' title='Owner' name='Owners' allowMultiple={true} dataSource={ownerData} textField='Text' idField='Id' colorField='Color' />
                </ResourcesDirective>
                <Inject services={[Day,Week, WorkWeek, Month, Agenda, TimelineMonth]}/>
            </ScheduleComponent>
        </div>
    );
}

export default AdminScheduleView;