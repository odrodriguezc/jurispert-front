import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/tasks/Task';
import { Event } from '../event';
import { EventsService } from '../events.service';
import { UiService } from 'src/app/ui/ui.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/project/Project';
import { User } from 'src/app/auth/user';

@Component({
  selector: 'app-events-show',
  templateUrl: './events-show.component.html',
  styleUrls: ['./events-show.component.css'],
})
export class EventsShowComponent implements OnInit {
  @Input()
  event: Event | null;

  @Input()
  project: Project;

  @Input()
  currentUser: User;

  @Input()
  open = false;

  @Output()
  deletedEvent = new EventEmitter();

  @Output()
  editedEvent = new EventEmitter();

  constructor(
    private eventsService: EventsService,
    private ui: UiService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  handleDelete(e: Event) {
    const eventCopy = this.event;

    this.eventsService.delete(e.id).subscribe(
      (event) => {
        this.toastr.success("l'evennement a bien été supprimé", 'success');
        this.deletedEvent.emit(eventCopy);
        this.open = false;
      },
      (error) => {
        this.event = eventCopy;
        this.toastr.warning("Nous n'avons pas pu supprimer l'evennement");
      }
    );
  }

  participantIsAuthorized() {
    const index = this.project.participations.findIndex(
      (participation) => participation.user.id === this.currentUser.id
    );

    return this.project.participations[index].role !== 'VIEWER';
  }
}
