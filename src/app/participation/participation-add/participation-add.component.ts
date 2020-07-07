import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Participation } from '../Participation';
import { ParticipationService } from '../participation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/auth/user';
import { AuthService } from 'src/app/auth/auth.service';
import { UserService } from 'src/app/user/user.service';
import { Project } from 'src/app/project/Project';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-participation-add',
  template: `
    <button
      class="btn btn-link"
      *ngIf="!open && participantIsAuthorized()"
      (click)="open = !open"
    >
      Ajouter
    </button>
    <ng-container *ngIf="open">
      <form [formGroup]="form" (ngSubmit)="handleSubmit()">
        <select class="form-control" formControlName="user" id="user">
          <option value=""> -- selectionez le travailleur -- </option>
          <option value="{{ u.id }}" *ngFor="let u of users">
            {{ u.firstName }} {{ u.lastName }}
          </option>
        </select>

        <select class="form-control" formControlName="role" id="role">
          <option value=""> -- selectionez le role -- </option>
          <option value="VIEWER">
            Assistant
          </option>
          <option value="MANAGER">
            Gestionnaire
          </option>
        </select>

        <button class="btn btn-success">Enregistrer</button>
      </form></ng-container
    >
  `,
  styles: [],
})
export class ParticipationAddComponent implements OnInit {
  @Input()
  project: Project;

  @Input()
  currentUser: any;

  @Output()
  participationAdded = new EventEmitter();

  users: User[] = [];

  form = new FormGroup({
    user: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
  });

  open = false;
  submitted = false;

  constructor(
    private participationService: ParticipationService,
    private auth: AuthService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService
      .findAll()
      .subscribe((data) => (this.users = data['hydra:member']));
  }

  handleSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let found = this.project.participations.find(
      (element) => element.user.id === +this.form.value.user
    );

    if (found) {
      this.toastr.warning(
        "Le travailler est déjà present dans l'equipe de travail",
        'Attention'
      );
      return;
    }

    this.participationService
      .add({
        ...this.form.value,
        user: '/api/users/' + this.form.value.user,
        project: '/api/projects/' + this.project.id,
      })
      .subscribe((newParticipation) => {
        this.open = false;
        this.project.participations.push(newParticipation);
      }),
      (error: HttpErrorResponse) => {
        this.toastr.warning(
          "Nou n'avons pas pu modifier l'equipe de travail",
          'Alert'
        );
        return;
      };
  }

  participantIsAuthorized() {
    const index = this.project.participations.findIndex(
      (participation) => participation.user.id === this.currentUser.id
    );

    return this.project.participations[index].role !== 'VIEWER';
  }
}
