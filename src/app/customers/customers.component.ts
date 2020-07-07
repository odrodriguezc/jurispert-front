import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CustomersService } from './customers.service';
import { Customer } from './customer';
import { UiService } from '../ui/ui.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customers',
  template: `
    <div class="mb-3 mt-5">
      <h1 class="text-center">Mes clients</h1>
      <a routerLink="/customers/new" class="btn btn-link">Ajouter un client</a>
      <table class="table table-hover">
        <thead>
          <tr class="table-dark">
            <th class="text-center">Id</th>
            <th class="text-center">Nom</th>
            <th class="text-center">Entreprise</th>
            <th class="text-center">Email</th>
            <th class="text-center">Adresse</th>
            <th class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            *ngFor="let c of customers; let isOdd = odd"
            [class.table-secondary]="isOdd"
            [class.table-primary]="!isOdd"
          >
            <td>{{ c.id }}</td>
            <td>
              <a routerLink="/customers/{{ c.id }}"
                >{{ c.firstName }} {{ c.lastName }}</a
              >
            </td>
            <td>{{ c.company }}</td>
            <td>{{ c.email }}</td>
            <td>
              <address>{{ c.address }}</address>
            </td>
            <td>
              <a
                routerLink="/customers/edit/{{ c.id }}"
                class="btn btn-primary btn-sm"
                ><i class="fas fa-edit"></i
              ></a>
              <button
                class="ml-1 btn btn-danger btn-sm"
                (click)="handleDelete(c)"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [],
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(
    private customersService: CustomersService,
    private ui: UiService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customers = this.route.snapshot.data.customers;
  }

  handleDelete(c: Customer) {
    const customersCopy = [...this.customers];

    const index = this.customers.indexOf(c);
    this.customers.splice(index, 1);

    this.ui.setLoading(true);

    this.customersService.delete(c.id).subscribe(
      () => {
        this.toastr.success('le Client a bien été supprimé', 'success');
        this.ui.setLoading(false);
      },
      (error) => {
        this.customers = customersCopy;
        //TODO : aficher l'erreur symfony

        this.toastr.warning(
          "Nous n'avons pas pu supprimer le client",
          'Une erreur est survenue'
        );
        this.ui.setLoading(false);
      }
    );
  }
}
