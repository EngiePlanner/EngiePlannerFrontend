import { AuthenticationService } from 'src/app/services/authentication.service';
import { GanttLink } from './../../models/gantt-link.model';
import { GanttTask } from './../../models/gantt-task.model';
import { ITask } from './../../models/task.model';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, ViewEncapsulation, EventEmitter, OnDestroy } from '@angular/core';
import { gantt } from 'dhtmlx-gantt';
import { DatePipe } from '@angular/common';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttChartComponent implements OnInit, OnDestroy {
  @ViewChild("gantt") ganttContainer: ElementRef;
  @Input() scheduledTasks: ITask[] = [] as ITask[];
  @Input() updated: ITask | undefined;
  @Output() updatedChange: EventEmitter<ITask> = new EventEmitter();
  ganttTasks: GanttTask[] = [] as GanttTask[];
  ganttLinks: GanttLink[] = [] as GanttLink[];
  pipe = new DatePipe('en-US');
  eventId: string | undefined;

  constructor(private el: ElementRef, private authenticationService: AuthenticationService) {
    this.ganttContainer = el;
   }

  ngOnInit() {
    var formatter = gantt.ext.formatters.durationFormatter({
      enter: "hour",
      store: "hour",
      format: "day",
      hoursPerDay: 8,
      hoursPerWeek: 40,
      daysPerMonth: 30
    });

    gantt.config.xml_date = "%Y-%m-%d";
    gantt.config.duration_unit = "hour";
    gantt.config.work_time = true;
    gantt.config.round_dnd_dates = false;
    gantt.config.drag_resize = false;
    gantt.config.drag_progress = false;
    gantt.config.drag_links = false;
    gantt.config.buttons_left = ["gantt_delete_btn"];
    gantt.locale.labels.icon_delete = "Unschedule";
    gantt.locale.labels.confirm_deleting = "This task will be unscheduled, are you sure?";
    gantt.config.buttons_right = ["gantt_cancel_btn"];
    gantt.locale.labels.icon_cancel = "Close";

    gantt.templates.scale_cell_class = function(date){
      if(date.getDay() == 0 || date.getDay() == 6)
          return "week_end";
      return "";
    };

    gantt.templates.timeline_cell_class = function(task, date){
      if(date.getDay() == 0 || date.getDay() == 6)
          return "week_end";
      return "";
    };

    gantt.config.columns = [
      {name: "text", label: "Name", tree: false, align: "center", width: 170, resize: true},
      {name: "start_date", label: "Start Date", align: "center", width: 170, resize: false},
      {name: "duration", label:"Duration(h)", resize: true, align: "center",
        template: function(task: any) {
            return formatter.format(task.duration);
        }, width: 100},
    ];

    gantt.config.readonly_form = true;
    gantt.config.lightbox.sections = [
      {name: "description", label: 'Responsible', height: 55, map_to: "description", type: "textarea", readonly: true, single_date: true},
      {}
    ];

    gantt.init(this.ganttContainer!.nativeElement);

    gantt.attachEvent("onTaskDrag", function(id, mode, task, original){
      const plannedDate = new Date(task.plannedDate);
      const availabilityDate = new Date(task.availabilityDate);
      var diff = original.duration*(1000*60*60);

      if (+task.end_date > +plannedDate){
        if (plannedDate.getDay() == 6) {
          diff = diff*2;
        }
        if (plannedDate.getDay() == 0) {
          diff = diff*3;
        }
        task.end_date = new Date(+plannedDate - diff);
        task.start_date = new Date(task.end_date - diff);
      }

      if (+task.start_date < +availabilityDate){
        if (availabilityDate.getDay() == 6) {
          diff = diff*3;
        }
        if (availabilityDate.getDay() == 0) {
          diff = diff*3;
        }
        task.start_date = new Date(+availabilityDate + diff);
        task.end_date = new Date(task.start_date + diff);
      }

    }, "");

    this.eventId = gantt.attachEvent("onAfterTaskDrag", (id, mode, e) =>{
      const ganttTask = gantt.getTask(id);
      this.updated = this.scheduledTasks.filter(x => x.id == id)[0];
      this.updated.startDate = new Date(ganttTask.start_date);
      this.updated.endDate = new Date(ganttTask.end_date);
      this.updatedChange.next(this.updated)
    }, "");

    gantt.attachEvent("onLightboxDelete", (id, node, e) => {
      this.updated = this.scheduledTasks.filter(x => x.id == id)[0];
      this.updated.startDate = undefined;
      this.updated.endDate = undefined;
      this.updatedChange.next(this.updated)
      return true;
  }, "");

    this.mapTasksForGanttChart(this.scheduledTasks);
    this.mapLinksForGanttChart(this.scheduledTasks);
    gantt.parse({tasks: this.ganttTasks, links: this.ganttLinks});
  }

  mapTasksForGanttChart(tasks: ITask[]): void {
    tasks.forEach(x => {
      let stringStartDate = this.pipe.transform(x.startDate, 'yyyy-MM-dd');
      let stringEndDate = this.pipe.transform(x.endDate, 'yyyy-MM-dd');
      let stringPlannedDate = this.pipe.transform(x.plannedDate, 'yyyy-MM-dd');
      let stringAvailabilityDate = this.pipe.transform(x.availabilityDate, 'yyyy-MM-dd');
      let color;
      if (x.responsibleUsername == this.authenticationService.getUsername()) {
        color = '#62b16e';
      } else {
        color = '#04a5ca';
      }
      const ganttTask = {
        id: x.id,
        text: x.name,
        start_date: stringStartDate,
        endDate: stringEndDate,
        duration: x.duration,
        responsible: x.responsibleDisplayName,
        description: this.generateDescription(x),
        plannedDate: stringPlannedDate,
        availabilityDate: stringAvailabilityDate,
        color: color
      } as GanttTask
      this.ganttTasks.push(ganttTask);
    })
  }

  mapLinksForGanttChart(tasks: ITask[]): void {
    tasks.forEach(x => {
      x.predecessors.forEach( y => {
        const ganttLink = {
          id: Number(y.id!.toString() + x.id!.toString()),
          source: y.id,
          target: x.id,
          type: '0'
        } as GanttLink

        this.ganttLinks.push(ganttLink)
      })
    })
  }

  generateDescription(task: ITask): string {
    const description = 'Responsible: ' + task.responsibleDisplayName + '\n' +
      'Availability Date: ' + this.pipe.transform(task.availabilityDate, 'yyyy-MM-dd') + '\n' +
      'Planned Date: ' + this.pipe.transform(task.plannedDate, 'yyyy-MM-dd');

    return description
  }

  ngOnDestroy() {
    gantt.detachEvent(this.eventId!);
    gantt.clearAll();
  }
}
