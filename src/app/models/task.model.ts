export interface ITask {
    id?: number;
    name: string;
    deliveryId: number;
    startDate: Date;
    plannedDate: Date;
    subteam: string;
    duration: number;
    employees: string[];
}
