import { IUser } from './user.model';
export interface ITask {
    id?: number;
    name: string;
    startDate: Date;
    plannedDate: Date;
    subteam: string;
    duration: number;
    predecessors: ITask[];
    responsibleUsername: string;
    responsibleDisplayName: string;
    ownerUsername: string;
    endDate: Date;
    isSelected?: boolean;
}
