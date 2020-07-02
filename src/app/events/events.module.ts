import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EventsCreateComponent } from './events-create/events-create.component';
import { EventsEditComponent } from './events-edit/events-edit.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsShowComponent } from './events-show/events-show.component';

@NgModule({
  declarations: [
    EventsListComponent,
    EventsCreateComponent,
    EventsEditComponent,
    EventsShowComponent,
  ],
  imports: [SharedModule],
  exports: [EventsCreateComponent, EventsEditComponent, EventsShowComponent],
})
export class EventsModule {}
