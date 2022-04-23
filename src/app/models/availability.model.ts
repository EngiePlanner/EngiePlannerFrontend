export interface IAvailability {
  id: number;
  userUsername: string;
  fromDate: Date;
  toDate: Date;
  defaultAvailableHours: number;
  unscheduledHours: number;
}
