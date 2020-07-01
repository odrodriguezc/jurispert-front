import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list.component';
import { ProjectShowComponent } from './project-show.component';
import { ProjectCreateComponent } from './create/project-create.component';
import { TasksModule } from '../tasks/tasks.module';
import { ProjectEditComponent } from './edit/project-edit.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectShowComponent,
    ProjectCreateComponent,
    ProjectEditComponent,
  ],
  imports: [SharedModule, TasksModule],
})
export class ProjectModule {}
