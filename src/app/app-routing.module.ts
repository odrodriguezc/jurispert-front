import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { ProjectListComponent } from './project/project-list.component';
import { ProjectShowComponent } from './project/project-show.component';
import { ProjectResolverService } from './project/project-resolver.service';
import { CustomersComponent } from './customers/customers.component';
import { CustomersResolverService } from './customers/customers-resolver.service';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { CustomerShowComponent } from './customers/customer-show/customer-show.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskResolverService } from './tasks/task-resolver.service';
import { TaskCreateComponent } from './tasks/task-create/task-create.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TaskShowComponent } from './tasks/task-show/task-show.component';
import { EventsCreateComponent } from './events/events-create/events-create.component';
import { EventsEditComponent } from './events/events-edit/events-edit.component';
import { EventResolverService } from './events/event-resolver.service';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventsShowComponent } from './events/events-show/events-show.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'projects',
    component: ProjectListComponent,
    resolve: { projects: ProjectResolverService },
  },
  {
    path: 'projects/:id',
    component: ProjectShowComponent,
    resolve: { projects: ProjectResolverService },
  },
  {
    path: 'customers',
    component: CustomersComponent,
    resolve: { customers: CustomersResolverService },
  },
  {
    path: 'customers/new',
    component: CustomerCreateComponent,
  },
  {
    path: 'customers/edit/:id',
    component: CustomerEditComponent,
    resolve: { customer: CustomersResolverService },
  },
  {
    path: 'customers/:id',
    component: CustomerShowComponent,
    resolve: { customer: CustomersResolverService },
  },
  {
    path: 'tasks',
    component: TaskListComponent,
    resolve: { tasks: TaskResolverService },
  },
  {
    path: 'tasks/new',
    component: TaskCreateComponent,
  },
  {
    path: 'tasks/edit/:id',
    component: TaskEditComponent,
    resolve: { task: TaskResolverService },
  },
  {
    path: 'tasks/:id',
    component: TaskShowComponent,
    resolve: { task: TaskResolverService },
  },
  {
    path: 'events',
    component: EventsListComponent,
    resolve: { events: EventResolverService },
  },
  {
    path: 'events/new',
    component: EventsCreateComponent,
  },
  {
    path: 'events/edit/:id',
    component: EventsEditComponent,
    resolve: { event: EventResolverService },
  },
  {
    path: 'events/:id',
    component: EventsShowComponent,
    resolve: { event: EventResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
