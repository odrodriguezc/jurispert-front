import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskShowComponent } from './task-show/task-show.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskShowComponent,
    TaskCreateComponent,
    TaskEditComponent,
  ],
  imports: [SharedModule],
  exports: [TaskCreateComponent, TaskEditComponent],
})
export class TasksModule {}
