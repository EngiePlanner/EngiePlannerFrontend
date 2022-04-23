export interface GanttTask {
    id: number;
    start_date: string;
    endDate: string;
    text: string;
    duration: number;
    description: string;
    plannedDate: string;
    availabilityDate: string;
}
