import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProjectListComponent } from './project-list.component';
import { ProjectShowComponent } from './project-show.component';

@NgModule({
  declarations: [ProjectListComponent, ProjectShowComponent],
  imports: [SharedModule],
})
export class ProjectModule {}
