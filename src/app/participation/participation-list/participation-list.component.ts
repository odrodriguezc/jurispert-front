import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/auth/user';
import { Project } from 'src/app/project/Project';
import { Participation } from '../Participation';
import { ParticipationService } from '../participation.service';

@Component({
  selector: 'app-participation-list',
  template: `
    <section>
      <div class="card">
        <h5 class="card-header">Equipe de travail</h5>
        <div class="card-body">
          <div *ngFor="let p of project.participations">
            <div class="card-text">
              <span *ngIf="p.role !== 'VIEWER'">
                <i class="fas fa-gamepad"></i
              ></span>
              <span> {{ filterRole(p.role) }} :</span>{{ p.user.fullName }}
              <ng-container
                *ngIf="p.role !== 'CREATOR' && participantIsAuthorized()"
              >
                <app-participation-edit
                  [currentParticipation]="p"
                  [currentUser]="currentUser"
                  [project]="project"
                ></app-participation-edit>
                <button (click)="handleDelete(p)" class="btn btn-link btn-sm">
                  <i class="far fa-trash-alt"></i>
                </button>
              </ng-container>
            </div>
          </div>
          <app-participation-add
            class="mt-3"
            [currentUser]="currentUser"
            [project]="project"
          ></app-participation-add>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ParticipationListComponent implements OnInit {
  @Input()
  project: Project;

  @Input()
  currentUser: User;

  constructor(
    private participationServive: ParticipationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  handleDelete(participation: Participation) {
    const participationsCopy = [...this.project.participations];

    const index = this.project.participations.indexOf(participation);
    this.project.participations.splice(index, 1);

    this.participationServive.remove(+participation.id).subscribe(
      (p) => {
        this.toastr.success("L'equipe a bien été modifiée", 'Success');
      },
      (error: HttpErrorResponse) => {
        this.toastr.warning("Nous n'avons pas pu modifier l'equipe", 'Alert');
        this.project.participations = participationsCopy;
      }
    );
  }

  participantIsAuthorized() {
    const index = this.project.participations.findIndex(
      (participation) => participation.user.id === this.currentUser.id
    );

    return this.project.participations[index].role !== 'VIEWER';
  }

  public filterRole(role: string) {
    switch (role) {
      case 'CREATOR':
        return 'Createur';
      case 'MANAGER':
        return 'Gestionnaire';
      case 'VIEWER':
        return 'Assistant';
      default:
        break;
    }
  }
}
