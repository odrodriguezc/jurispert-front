import { NgModule } from '@angular/core';
import { EventsModule } from '../events/events.module';
import { SharedModule } from '../shared/shared.module';
import { TasksModule } from '../tasks/tasks.module';
import { ProjectCreateComponent } from './create/project-create.component';
import { ProjectEditComponent } from './edit/project-edit.component';
import { ProjectListComponent } from './list/project-list.component';
import { ProjectShowComponent } from './show/project-show.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectShowComponent,
    ProjectCreateComponent,
    ProjectEditComponent,
  ],
  imports: [SharedModule, TasksModule, EventsModule],
})
export class ProjectModule {}
