import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from './Task';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root',
})
export class TaskResolverService implements Resolve<Task[] | Task> {
  constructor(private taskService: TaskService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Task[] | Task> {
    if (route.paramMap.has('id')) {
      return this.taskService.find(+route.paramMap.get('id'));
    }

    return this.taskService.findAll();
  }
}
