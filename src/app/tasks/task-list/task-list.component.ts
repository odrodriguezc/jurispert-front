import { Component, OnInit } from '@angular/core';
import { Task } from '../Task';
import { TaskService } from '../task.service';
import { UiService } from 'src/app/ui/ui.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from 'src/app/project/Project';

@Component({
  selector: 'app-task-list',
  template: `
    <h1>Mes taches</h1>
    <table class="table table-hover">
      <thead>
        <tr class="table-primary">
          <th class="text-center">Id</th>
          <th class="text-center">Title</th>
          <th class="text-center">Status</th>
          <th class="text-center">Depuis</th>
          <th class="text-center">Deadline</th>
          <th class="text-center">Projet</th>
          <th class="txt-center"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          *ngFor="let t of tasks; let isOdd = odd"
          [class.table-secondary]="isOdd"
          [class.table-primary]="!isOdd"
        >
          <td>
            <a routerLink="/tasks/{{ t.id }}"> {{ t.id }}</a>
          </td>
          <td>
            <a routerLink="/tasks/{{ t.id }}"> {{ t.title }}</a>
          </td>
          <td>{{ t.completed }}</td>
          <td>{{ t.createdAt | date: 'longDate' }}</td>
          <td>{{ t.deadline | date: 'longDate' }}</td>
          <td>{{ t.project.title }}</td>
          <td>
            <button
              *ngIf="!t.completed"
              (click)="handleStatus(t, true)"
              class="btn btn-success ml-3"
            >
              Completer
            </button>
            <button
              *ngIf="t.completed"
              (click)="handleStatus(t, false)"
              class="btn btn-warning ml-3"
            >
              Re-ouvrir
            </button>
            <button
              class="ml-1 btn btn-danger btn-sm"
              (click)="handleDelete(t)"
            >
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private tasksService: TaskService,
    private ui: UiService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tasks = this.route.snapshot.data.tasks;
    console.log(this.tasks);
  }

  handleDelete(t: Task) {
    const tasksCopy = [...this.tasks];

    const index = this.tasks.indexOf(t);
    this.tasks.splice(index, 1);

    this.ui.setLoading(true);

    this.tasksService.delete(+t.id).subscribe(
      () => {
        this.toastr.success('la tache a bien été supprimé', 'success');
        this.ui.setLoading(false);
      },
      (error) => {
        this.tasks = tasksCopy;
        //TODO : aficher l'erreur symfony

        this.toastr.warning(
          "Nous n'avons pas pu supprimer cette tache",
          'Une erreur est survenue'
        );
        this.ui.setLoading(false);
      }
    );
  }

  handleStatus(task: Task, status: boolean) {
    this.tasksService
      .update({
        ...task,
        project: '/api/projects/' + (task.project as Project).id,
        completed: status,
      })
      .subscribe(
        (task) => {
          this.toastr.success('La tache a bien été modifié', 'success');
          const index = this.tasks.findIndex(
            (element) => element.id === task.id
          );
          this.tasks[index] = task;
        },
        (error: HttpErrorResponse) => {
          this.toastr.warning("Nous n'avons pas pu modifier la tache", 'fail');
          return;
        }
      );
  }
}
