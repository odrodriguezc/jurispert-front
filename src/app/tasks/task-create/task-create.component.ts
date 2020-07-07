import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Project } from 'src/app/project/Project';
import { UiService } from 'src/app/ui/ui.service';
import { TaskService } from '../task.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-create',
  template: `
    <button
      class="btn btn-primary"
      *ngIf="!open && participantIsAuthorized()"
      (click)="open = !open"
    >
      Ajouter une tache
    </button>

    <ng-container *ngIf="open">
      <h2>Nouvelle</h2>

      <form [formGroup]="form" (ngSubmit)="handleSubmit()">
        <div class="form-group">
          <label for="title">Titre de la tache</label>
          <input
            type="text"
            class="form-control"
            [class.is-invalid]="submitted && form.controls['title'].invalid"
            id="title"
            formControlName="title"
          />
          <p class="invalid-feedback">
            {{ form.controls['title'].getError('invalid') }}
          </p>
        </div>
        <div class="form-group">
          <label for="deadline">Date butoir</label>
          <input
            type="date"
            class="form-control"
            [class.is-invalid]="submitted && form.controls['deadline'].invalid"
            id="deadline"
            formControlName="deadline"
          />
          <p class="invalid-feedback">
            {{ form.controls['deadline'].getError('invalid') }}
          </p>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            class="form-control"
            [class.is-invalid]="
              submitted && form.controls['description'].invalid
            "
            id="description"
            formControlName="description"
          ></textarea>
          <p class="invalid-feedback">
            {{ form.controls['description'].getError('invalid') }}
          </p>
        </div>

        <button class="btn btn-success">Enregistrer</button>
        <button (click)="open = false" class="btn btn-warning">Annuler</button>
      </form>
    </ng-container>
  `,
  styles: [],
})
export class TaskCreateComponent implements OnInit {
  submitted: boolean = false;

  @Input()
  currentUser: any;

  @Input()
  project: Project;

  @Output()
  taskCreated = new EventEmitter();

  constructor(
    private taskService: TaskService,
    private ui: UiService,
    private toastr: ToastrService
  ) {}

  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    deadline: new FormControl('', [Validators.required]),
  });

  open: boolean = false;

  ngOnInit(): void {}

  handleSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.taskService
      .create({
        ...this.form.value,
        completed: false,
        project: '/api/projects/' + this.project.id,
      })
      .subscribe(
        (task) => {
          this.taskCreated.emit(task);
          this.open = false;
          this.toastr.success('La tache a bien été créé');
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
