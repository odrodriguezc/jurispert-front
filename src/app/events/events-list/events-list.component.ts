import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EventsService } from '../events.service';
import { UiService } from 'src/app/ui/ui.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit {
  events: Event[] = [];

  constructor(
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private ui: UiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.events = this.route.snapshot.data.events;
    console.log(this.events);
  }

  handleDelete(e: Event) {
    const eventsCopy = [...this.events];

    this.events.splice(this.events.indexOf(e), 1);

    this.ui.setLoading(true);

    this.eventsService.delete(e.id).subscribe(
      () => {
        this.toastr.success("L'evennement a bien été supprimé", 'success');
        this.ui.setLoading(false);
      },
      (error) => {
        this.events = eventsCopy;
        //todo afficher eerrur symfony

        this.toastr.error("Nous n'avons pas pu supprimer l'evennement");
        this.ui.setLoading(false);
      }
    );
  }
}
