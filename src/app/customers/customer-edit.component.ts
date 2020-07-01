import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from '../ui/ui.service';
import { Customer } from './customer';
import { CustomersService } from './customers.service';

@Component({
  selector: 'app-customer-edit',
  template: `
    <h1>Modifier un client</h1>
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Nom complet"
          formControlName="firstName"
          [class.is-invalid]="submitted && form.controls['firstName'].invalid"
        />
        <p class="invalid-feedback">
          {{ form.controls['firstName'].getError('invalid') }}
        </p>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Nom complet"
          formControlName="lastName"
          [class.is-invalid]="submitted && form.controls['lastName'].invalid"
        />
        <p class="invalid-feedback">
          {{ form.controls['lastName'].getError('invalid') }}
        </p>
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          placeholder="Adresse email"
          formControlName="email"
          [class.is-invalid]="submitted && form.controls['email'].invalid"
        />
        <p class="invalid-feedback">
          {{ form.controls['email'].getError('invalid') }}
        </p>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Adresse "
          formControlName="address"
          [class.is-invalid]="submitted && form.controls['address'].invalid"
        />
        <p class="invalid-feedback">
          {{ form.controls['address'].getError('invalid') }}
        </p>
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Entreprise / Societé"
          formControlName="company"
          [class.is-invalid]="submitted && form.controls['company'].invalid"
        />
      </div>
      <p class="invalid-feedback">
        {{ form.controls['company'].getError('invalid') }}
      </p>
      <button class="btn btn-success">Enregistrer</button>
    </form>
  `,
  styles: [],
})
export class CustomerEditComponent implements OnInit {
  customer: Customer;
  submitted = false;

  form = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    company: new FormControl(''),
  });

  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.customer = data.customer;
      this.form.patchValue(this.customer);
    });
  }

  handleSubmit() {
    this.submitted = true;
    this.customersService
      .update({ ...this.form.value, id: this.customer.id })
      .subscribe(
        (customer) => {
          this.ui.addFlash(
            'success',
            `Le client ${
              customer.firstName + customer.lastName
            } a bien été enregistré !`
          );
          this.router.navigateByUrl('/customers');
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error.violations) {
            this.ui.fillViolationsInForm(this.form, error.error.violations);
          }
        }
      );
  }
}
