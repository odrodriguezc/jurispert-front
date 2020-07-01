import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/project/Project';
import { UiService } from 'src/app/ui/ui.service';
import { Task } from '../Task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-edit',
  template: `
    <button
      class="btn btn-link"
      *ngIf="!open && participantIsAuthorized()"
      (click)="open = !open"
    >
      modifier
    </button>

    <ng-container *ngIf="open">
      <h1>Modifier une tache</h1>
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
      </form>
    </ng-container>
  `,
  styles: [],
})
export class TaskEditComponent implements OnInit {
  submitted: boolean = false;
  projects: Project[] = [];

  @Input()
  currentUser: any;

  @Input()
  currentTask: Task;

  @Input()
  project: Project;

  @Output()
  editedTask = new EventEmitter();

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    deadline: new FormControl('', [Validators.required]),
  });

  open: boolean = false;

  constructor(private taskService: TaskService, private ui: UiService) {}

  ngOnInit(): void {
    this.form.patchValue(this.currentTask);
  }

  handleSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.taskService
      .update({ ...this.currentTask, ...this.form.value, completed: false })
      .subscribe(
        (task) => {
          this.editedTask.emit(task);
          this.open = false;
          //TODO: notification
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
      (participation) => (participation.user.id = this.currentUser.id)
    );

    return this.project.participations[index].role !== 'VIEWER';
  }
}
