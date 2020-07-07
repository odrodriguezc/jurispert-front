import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Event } from '../events/event';
import { EventsService } from '../events/events.service';
import { ProjectService } from '../project/project.service';
import { Task } from '../tasks/Task';
import { TaskService } from '../tasks/task.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="mb-3 mt-5">
      <h1 class="text-center mb-2">Dashboard</h1>
      <div class="container">
        <app-dashboard-chart></app-dashboard-chart>
      </div>
      <div class="row">
        <div class="col">
          <h3>Prochains evennemets</h3>
          <div class="list-group">
            <a
              *ngFor="let e of nextEvents"
              routerLink="/projects/{{ e.project.id }}"
              class="list-group-item list-group-item-action flex-column align-items-start "
              routerLinkActive="active"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ e.title }}</h5>
                <small> {{ calcInterval(e.date) }} </small>
              </div>
              <p class="mb-1">
                {{ e.description }}
              </p>
              <small>Donec id elit non mi porta.</small>
            </a>
          </div>
        </div>
        <div class="col">
          <h3>Taches prioritaires</h3>
          <div class="list-group">
            <a
              *ngFor="let t of priorityTasks"
              routerLink="/projects/{{ t.project.id }}"
              class="list-group-item list-group-item-action flex-column align-items-start "
              routerLinkActive="active"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ t.title }}</h5>
                <small> {{ calcInterval(t.deadline) }} </small>
              </div>
              <p class="mb-1">
                {{ t.description }}
              </p>
              <small>Donec id elit non mi porta.</small>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class DashboardComponent implements OnInit {
  priorityTasks: Task[] = [];
  nextEvents: Event[] = [];

  constructor(
    private projectSertice: ProjectService,
    private taskService: TaskService,
    private eventService: EventsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.priorityTasks = this.route.snapshot.data.tasks.slice(0, 3);
    this.nextEvents = this.route.snapshot.data.events.slice(0, 3);
  }

  calcInterval(date) {
    return moment(date).startOf('day').fromNow();
  }
}
