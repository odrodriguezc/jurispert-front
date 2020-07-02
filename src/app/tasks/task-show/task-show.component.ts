import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../task.service';
import { UiService } from 'src/app/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../Task';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from 'src/app/project/Project';

@Component({
  selector: 'app-task-show',
  template: `
    <ng-container *ngIf="task">
      <div class="card border-secondary mb-3">
        <div class="card-header">Task</div>
        <div class="card-body">
          <h4 class="card-title">{{ task.title }}</h4>
          <h6 class="mb-2">Description</h6>
          <p class="card-text">
            {{ task.description }}
          </p>
          <p class="card-text">
            Debut: <span> {{ task.createdAt | date: 'longDate' }} </span> Fin:
            <span> {{ task.deadline | date: 'longDate' }} </span>
          </p>
          <p class="card-text">
            Status: <span *ngIf="task.completed">complete</span>
            <span *ngIf="!task.completed">Incomplete</span>
          </p>
          <div class="flex">
            <button
              *ngIf="!task.completed"
              (click)="handleStatus(true)"
              class="btn btn-success ml-3"
            >
              Completer
            </button>
            <button
              *ngIf="task.completed"
              (click)="handleStatus(false)"
              class="btn btn-warning ml-3"
            >
              Re-ouvrir
            </button>
            <button class="btn btn-danger ml-3 " (click)="handleDelete(task)">
              Supprimer
            </button>
            <button class="btn btn-secundary ml-3 " (click)="task = null">
              Back
            </button>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class TaskShowComponent implements OnInit {
  open: boolean = false;

  @Input()
  task: Task | null;

  @Input()
  project: Project;

  @Output()
  deletedTask = new EventEmitter();

  @Output()
  editedTask = new EventEmitter();

  constructor(
    private tasksService: TaskService,
    private ui: UiService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleDelete(t: Task) {
    const taskCopy = this.task;

    this.tasksService.delete(+t.id).subscribe(
      (task) => {
        this.toastr.success('La tace a été bien supprimée', 'success');
        this.deletedTask.emit(taskCopy);
        this.task = null;
      },
      (error) => {
        this.task = taskCopy;
        this.toastr.warning("Nous n'avons pas pu supprimer la tache");
      }
    );
  }

  handleStatus(status: boolean) {
    this.tasksService
      .update({
        ...this.task,
        project: '/api/projects/' + this.project.id,
        completed: status,
      })
      .subscribe(
        (task) => {
          this.toastr.success('La tache a bien été modifié', 'success');
          this.task = task;
          this.editedTask.emit(task);
        },
        (error: HttpErrorResponse) => {
          this.toastr.warning("Nous n'avons pas pu modifier la tache", 'fail');
          return;
        }
      );
  }
}
