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
  selector: 'app-participation-edit',
  template: `
    <button class="btn btn-link btn-sm" *ngIf="!open" (click)="open = !open">
      <i class="far fa-edit"></i>
    </button>
    <ng-container *ngIf="open">
      <form [formGroup]="form" (ngSubmit)="handleSubmit()">
        <select class="form-control" formControlName="user" id="user">
          <option value="{{ u.id }}" *ngFor="let u of users">
            {{ u.firstName }} {{ u.lastName }}
          </option>
        </select>

        <select class="form-control" formControlName="role" id="role">
          <option value="VIEWER">
            Assistant
          </option>
          <option value="MANAGER">
            Gestionaire
          </option>
        </select>

        <button class="btn btn-success">Enregistrer</button>
      </form></ng-container
    >
  `,
  styles: [],
})
export class ParticipationEditComponent implements OnInit {
  @Input()
  project: Project;

  @Input()
  currentUser: any;

  @Input()
  currentParticipation: Participation;

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

    this.form.patchValue({
      ...this.currentParticipation,
      user: (this.currentParticipation.user as User).id,
    });
  }

  handleSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.participationService
      .update({
        ...this.currentParticipation,
        ...this.form.value,
        user: '/api/users/' + this.form.value.user,
        project: '/api/projects/' + this.project.id,
      })
      .subscribe((editedParticipation) => {
        this.open = false;
        const index = this.project.participations.findIndex(
          (element: Participation) => element.id === editedParticipation.id
        );
        this.project.participations[index] = editedParticipation;
        this.toastr.success("L'equipe de travail a bien été modifiée");
      }),
      (error: HttpErrorResponse) => {
        this.toastr.warning(
          "Nou n'avons pas pu modifier l'equipe de travail",
          'Alert'
        );
        return;
      };
  }
}
