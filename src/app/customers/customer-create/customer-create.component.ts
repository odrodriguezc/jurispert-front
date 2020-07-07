import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomersService } from '../customers.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styles: [],
})
export class CustomerCreateComponent implements OnInit {
  submitted: boolean = false;

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    company: new FormControl(''),
  });

  constructor(
    private customersService: CustomersService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  handleSubmit() {
    this.submitted = true;
    if (this.form.status === 'INVALID') {
      return;
    }
    this.customersService.create(this.form.value).subscribe(
      (customer) => {
        this.toastr.success('Le client a bien été creé');
        this.router.navigateByUrl('/customers');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400 && error.error.violations) {
          for (const v of error.error.violations) {
            const fieldname = v.propertyPath;
            const message = v.message;

            this.form.controls[fieldname].setErrors({
              invalid: message,
            });
          }
        }
      }
    );
  }

  hasError(inputName: string, errorName: string) {
    return this.form.controls[inputName].hasError(errorName) && this.submitted;
  }
}
