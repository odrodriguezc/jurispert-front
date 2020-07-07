import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UiService } from '../../ui/ui.service';
import { Project } from './../Project';
import { ProjectService } from './../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private ui: UiService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.projects = this.route.snapshot.data.projects;
  }

  public avgCalculator(project: Project) {
    let count = { completed: 0, incompleted: 0 };
    if (project.tasks.length > 0) {
      project.tasks.forEach((element) => {
        if (element.completed) {
          count.completed++;
        }
        count.incompleted++;
      });
    }

    if (count.completed !== 0) {
      return Math.ceil((count.completed / project.tasks.length) * 100);
    }
    return 0;
  }
}
