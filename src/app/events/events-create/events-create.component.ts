import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/project/Project';
import { UiService } from 'src/app/ui/ui.service';
import { EventsService } from '../events.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-events-create',
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.css'],
})
export class EventsCreateComponent implements OnInit {
  submitted: boolean = false;

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    address: new FormControl(''),
  });

  @Input()
  project: Project;

  @Input()
  currentUser: any;

  @Output()
  eventCreated = new EventEmitter();

  open = false;

  constructor(
    private eventsService: EventsService,
    private ui: UiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  handleSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.eventsService
      .create({
        ...this.form.value,
        project: '/api/projects/' + this.project.id,
      })
      .subscribe(
        (event) => {
          this.eventCreated.emit(event);
          this.toastr.success("L'evennement a bien été crée");
          this.open = false;
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
