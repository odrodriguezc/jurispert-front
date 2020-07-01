import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../customers.service';
import { UiService } from 'src/app/ui/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../customer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-show',
  template: `
    <div class="card">
      <div class="card-body">
        <p class="card-text">Id: {{ customer.id }}</p>
        <p class="card-text">
          Nom complet: {{ customer.firstName }} {{ customer.lastName }}
        </p>
        <p class="card-text">Adresse email: {{ customer.email }}</p>
        <p class="card-text">Adresse postale: {{ customer.address }}</p>
        <p class="cardtext">Entreprise: {{ customer.company }}</p>
      </div>
      <a routerLink="/customers/edit/{{ customer.id }}" class="card-link"
        >Modifier</a
      >
      <button class="btn btn-link" (click)="handleDelete(customer)">
        Supprimer
      </button>
    </div>
  `,
  styles: [],
})
export class CustomerShowComponent implements OnInit {
  customer: Customer;

  constructor(
    private customersService: CustomersService,
    private ui: UiService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.customer = this.route.snapshot.data.customer;
  }

  handleDelete(c: Customer) {
    const customersCopy = this.customer;

    this.ui.setLoading(true);

    this.customersService.delete(c.id).subscribe(
      () => {
        this.toastr.success('le Client a bien été supprimé', 'success');
        this.ui.setLoading(false);
      },
      (error) => {
        this.customer = customersCopy;
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
