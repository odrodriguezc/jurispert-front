import { Component, OnInit } from '@angular/core';
import { Project } from './Project';
import { ProjectService } from './project.service';
import { UiService } from '../ui/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../tasks/Task';
import { Event } from '../events/event';

@Component({
  selector: 'app-project-show',
  templateUrl: './project-show.component.html',
  styleUrls: ['./project-show.component.css'],
})
export class ProjectShowComponent implements OnInit {
  project: Project;

  constructor(
    private projectService: ProjectService,
    private ui: UiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.project = this.route.snapshot.data.projects;
    console.log(this.project);
  }

  handleNewTask(task: Task) {
    this.project.tasks.push(task);
  }

  handleNewEvent(event: Event) {
    this.project.events.push(event);
  }
}
