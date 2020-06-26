import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Project } from './Project';
import { ProjectService } from './project.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectResolverService implements Resolve<Project[] | Project> {
  constructor(private projectService: ProjectService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Project[] | Project> {
    if (route.paramMap.has('id')) {
      return this.projectService.find(+route.paramMap.get('id'));
    }

    return this.projectService.findAll();
  }
}
