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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
