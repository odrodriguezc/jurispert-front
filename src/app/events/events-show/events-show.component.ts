import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/tasks/Task';
import { Event } from '../event';
import { EventsService } from '../events.service';
import { UiService } from 'src/app/ui/ui.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events-show',
  templateUrl: './events-show.component.html',
  styleUrls: ['./events-show.component.css'],
})
export class EventsShowComponent implements OnInit {
  event: Event;

  constructor(
    private eventsService: EventsService,
    private ui: UiService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.event = this.route.snapshot.data.event;
    console.log(this.event);
  }

  handleDelete(e: Event) {
    const eventCopy = this.event;

    this.eventsService.delete(e.id).subscribe(
      () => this.toastr.success("l'evennement a bien été supprimé", 'success'),
      (error) => {
        this.event = eventCopy;
        this.toastr.error("Nous n'avons pas pu supprimer l'evennement");
      }
    );
  }
}
