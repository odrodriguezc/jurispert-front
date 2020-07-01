import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { UiService } from '../ui/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from './Project';
import { AuthService } from '../auth/auth.service';

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
}
