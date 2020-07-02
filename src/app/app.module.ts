import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './ui/navbar.component';
import { ProjectModule } from './project/project.module';
import { CustomersModule } from './customers/customers.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksModule } from './tasks/tasks.module';
import { EventsModule } from './events/events.module';
import { ParticipationModule } from './participation/participation.module';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FullCalendarModule,
    AppRoutingModule,
    AuthModule,
    ProjectModule,
    CustomersModule,
    TasksModule,
    EventsModule,
    ParticipationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
