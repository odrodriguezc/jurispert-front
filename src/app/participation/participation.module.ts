import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipationListComponent } from './participation-list/participation-list.component';
import { ParticipationAddComponent } from './participation-add/participation-add.component';
import { ParticipationEditComponent } from './participation-edit/participation-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ParticipationListComponent,
    ParticipationAddComponent,
    ParticipationEditComponent,
  ],
  imports: [SharedModule],
  exports: [
    ParticipationListComponent,
    ParticipationAddComponent,
    ParticipationEditComponent,
  ],
})
export class ParticipationModule {}
