import { Component, OnInit } from '@angular/core';
import { Project } from '../Project';
import { ProjectService } from '../project.service';
import { UiService } from '../../ui/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../tasks/Task';
import { Event } from '../../events/event';
import { AuthService } from '../../auth/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-project-show',
  templateUrl: './project-show.component.html',
  styleUrls: ['./project-show.component.css'],
})
export class ProjectShowComponent implements OnInit {
  project: Project;
  currentUser: any;
  currentTask: Task;
  currentEvent: Event;
  showTask = false;
  eventShow = false;

  constructor(
    private projectService: ProjectService,
    private ui: UiService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.project = this.route.snapshot.data.projects;
    this.currentUser = this.auth.getUser();
  }

  handleShowTask(task: Task) {
    this.currentTask = task;
    this.showTask = true;
  }

  handleNewTask(task: Task) {
    this.project.tasks.push(task);
  }

  handleEditedTask(task: Task) {
    const index = this.project.tasks.findIndex(
      (element: Task) => element.id === task.id
    );
    this.project.tasks[index] = task;
  }

  handleDeletedTask(task: Task) {
    const index = this.project.tasks.findIndex(
      (element: Task) => element.id === task.id
    );
    this.project.tasks.splice(index, 1);
  }

  handleShowEvent(event: Event) {
    this.currentEvent = event;
    this.eventShow = true;
  }

  handleNewEvent(event: Event) {
    this.project.events.push(event);
  }

  handleEditedEvent(event: Event) {
    const index = this.project.events.findIndex(
      (element: Event) => element.id === event.id
    );
    this.project.events[index] = event;
  }

  handleDeletedEvent(event: Event) {
    const index = this.project.events.findIndex(
      (element: Event) => element.id === event.id
    );
    this.project.events.splice(index, 1);
  }

  participantIsAuthorized() {
    const index = this.project.participations.findIndex(
      (participation) => participation.user.id === this.currentUser.id
    );

    return this.project.participations[index].role !== 'VIEWER';
  }

  public avgCalculator() {
    let count = { completed: 0, incompleted: 0 };
    if (this.project.tasks.length > 0) {
      this.project.tasks.forEach((element) => {
        if (element.completed) {
          count.completed++;
        }
        count.incompleted++;
      });
    }

    if (count.completed !== 0) {
      return Math.ceil((count.completed / this.project.tasks.length) * 100);
    }
    return 0;
  }

  calcInterval(date) {
    return moment(date).startOf('day').fromNow();
  }
}
