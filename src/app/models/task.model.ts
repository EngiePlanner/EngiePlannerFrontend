import { IUser } from './user.model';
export interface ITask {
    id?: number;
    name: string;
    availabilityDate: Date;
    plannedDate: Date;
    subteam: string;
    duration: number;
    predecessors: ITask[];
    responsibleUsername: string;
    responsibleDisplayName: string;
    ownerUsername: string;
    endDate: Date;
    startDate: Date;
    isSelected?: boolean;
}
