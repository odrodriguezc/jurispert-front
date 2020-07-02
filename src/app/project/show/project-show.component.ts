import { Component, OnInit } from '@angular/core';
import { Project } from '../Project';
import { ProjectService } from '../project.service';
import { UiService } from '../../ui/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../tasks/Task';
import { Event } from '../../events/event';
import { AuthService } from '../../auth/auth.service';

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
}
