import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationAdminGuard } from './auth/authorization-admin.guard';
import { LoginComponent } from './auth/login.component';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { CustomerShowComponent } from './customers/customer-show/customer-show.component';
import { CustomersResolverService } from './customers/customers-resolver.service';
import { CustomersComponent } from './customers/customers.component';
import { EventResolverService } from './events/event-resolver.service';
import { EventsListComponent } from './events/events-list/events-list.component';
import { ProjectCreateComponent } from './project/create/project-create.component';
import { ProjectEditComponent } from './project/edit/project-edit.component';
import { ProjectListComponent } from './project/list/project-list.component';
import { ProjectResolverService } from './project/project-resolver.service';
import { ProjectShowComponent } from './project/show/project-show.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskResolverService } from './tasks/task-resolver.service';
import { FormGuard } from './ui/form.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      tasks: TaskResolverService,
      events: EventResolverService,
      projects: ProjectResolverService,
    },
  },
  {
    path: 'projects',
    component: ProjectListComponent,
    resolve: { projects: ProjectResolverService },
  },
  {
    path: 'projects/new',
    component: ProjectCreateComponent,
    canActivate: [AuthorizationAdminGuard],
    resolve: { customers: CustomersResolverService },
  },
  {
    path: 'projects/edit/:id',
    component: ProjectEditComponent,
    canActivate: [AuthorizationAdminGuard],
    resolve: {
      project: ProjectResolverService,
    },
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
    canDeactivate: [FormGuard],
  },
  {
    path: 'customers/edit/:id',
    component: CustomerEditComponent,
    canDeactivate: [FormGuard],
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
    path: 'events',
    component: EventsListComponent,
    resolve: { events: EventResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
