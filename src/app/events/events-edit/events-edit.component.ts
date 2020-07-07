import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from 'src/app/project/Project';
import { EventsService } from '../events.service';
import { ProjectService } from 'src/app/project/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UiService } from 'src/app/ui/ui.service';
import { Event } from '../event';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.css'],
})
export class EventsEditComponent implements OnInit {
  submitted: boolean = false;
  open: boolean = false;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    address: new FormControl(''),
  });

  @Input()
  currentUser: any;

  @Input()
  project: Project;

  @Input()
  currentEvent: Event;

  @Output()
  editedEvent = new EventEmitter();

  constructor(
    private eventsService: EventsService,
    private projectsService: ProjectService,
    private router: Router,
    private ui: UiService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.currentEvent);
  }

  handleSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.eventsService
      .update({
        ...this.currentEvent,
        ...this.form.value,
        project: '/api/projects/' + this.project.id,
      })
      .subscribe(
        (event) => {
          this.editedEvent.emit(event);
          this.open = false;
          this.toastr.success("L'evennement a bien été modifié");
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error.violations) {
            this.ui.fillViolationsInForm(this.form, error.error.violations);
            return;
          }
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
