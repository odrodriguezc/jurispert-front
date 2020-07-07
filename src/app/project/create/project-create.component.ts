import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/customers/customer';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from 'src/app/ui/ui.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './project-create.component.html',
  styles: [],
})
export class ProjectCreateComponent implements OnInit {
  submitted: boolean = false;

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    shortDescription: new FormControl(''),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    deadline: new FormControl(''),
    adversary: new FormControl(''),
    customer: new FormControl('', [Validators.required]),
    category: new FormControl('PROTOTYPE'),
  });

  customers: Customer[] = [];

  constructor(
    private projectsService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private ui: UiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.customers = this.route.snapshot.data.customers;
  }

  handleSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.projectsService
      .create({ ...this.form.value, status: 'PRE-NEGOTIATIONS' })
      .subscribe(
        (project) => {
          this.toastr.success('Le projet a bien été creé');
          this.toastr.success('Le nouveau projet a bien été creé');
          this.router.navigateByUrl('/projects/' + project.id);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 400 && error.error.violations) {
            this.ui.fillViolationsInForm(this.form, error.error.violations);
            return;
          }
        }
      );
  }
}
