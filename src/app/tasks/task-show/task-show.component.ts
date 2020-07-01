import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { UiService } from 'src/app/ui/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../Task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-show',
  template: `
    <div class="card border-secondary mb-3">
      <div class="card-header">Task</div>
      <div class="card-body">
        <h4 class="card-title">{{ task.title }}</h4>
        <h5 class="card-subtitle mb-3">Projet: {{ task.project.title }}</h5>
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
          <button class="btn btn-success ml-3">Completer</button>
          <a routerLink="/tasks/edit/{{ task.id }}" class="btn btn-warning ml-3"
            >Modifier</a
          >
          <button class="btn btn-danger ml-3 " (click)="handleDelete(task)">
            Supprimer
          </button>
        </div>
      </div>
      <div class="card-footer">
        <a routerLink="/projects/{{ task.project.id }}" class="btn btn-link"
          >Go to project</a
        >
      </div>
    </div>
  `,
  styles: [],
})
export class TaskShowComponent implements OnInit {
  task: Task;

  constructor(
    private tasksService: TaskService,
    private ui: UiService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.task = this.route.snapshot.data.task;
    console.log(this.task);
  }

  handleDelete(t: Task) {
    const taskCopy = this.task;

    this.tasksService.delete(t.id).subscribe(
      () => {
        this.toastr.success('La tace a été bien supprimée', 'success');
      },
      (error) => {
        this.task = taskCopy;
        this.toastr.warning("Nous n'avons pas pu supprimer la tache");
      }
    );
  }
}
