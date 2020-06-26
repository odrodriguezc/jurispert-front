import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { ProjectListComponent } from './project/project-list.component';
import { ProjectShowComponent } from './project/project-show.component';
import { ProjectResolverService } from './project/project-resolver.service';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
