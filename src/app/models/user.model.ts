import { RoleType } from '../enums/role-type.enum';
export interface IUser {
    departments: string[];
    displayName: string;
    email: string;
    groups: string[];
    leaderUsername: string;
    leaderName: string;
    name: string;
    roleType: RoleType;
    username: string;
}
