import { IUser } from './user.model';
export interface ITask {
    id?: number;
    name: string;
    startDate: Date;
    plannedDate: Date;
    subteam: string;
    duration: number;
    employeeUsername: string;
    employee: IUser;
    predecessors: ITask[];
}
