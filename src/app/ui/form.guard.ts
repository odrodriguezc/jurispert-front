import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerCreateComponent } from '../customers/customer-create/customer-create.component';
import { CustomerEditComponent } from '../customers/customer-edit.component';
import { ProjectCreateComponent } from '../project/create/project-create.component';
import { ProjectEditComponent } from '../project/edit/project-edit.component';
import { TaskCreateComponent } from '../tasks/task-create/task-create.component';
import { TaskEditComponent } from '../tasks/task-edit/task-edit.component';
import { EventsCreateComponent } from '../events/events-create/events-create.component';
import { EventsEditComponent } from '../events/events-edit/events-edit.component';

@Injectable({
  providedIn: 'root',
})
export class FormGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component:
      | CustomerCreateComponent
      | CustomerEditComponent
      | ProjectCreateComponent
      | ProjectEditComponent
      | TaskCreateComponent
      | TaskEditComponent
      | EventsCreateComponent
      | EventsEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.submitted) {
      return true;
    }
    return window.confirm('Etes vous sûr de vouloir partir ?');
  }
}
