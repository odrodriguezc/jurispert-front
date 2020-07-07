import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/customers/customer';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from 'src/app/ui/ui.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Project } from '../Project';
import { CustomersService } from 'src/app/customers/customers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './project-edit.component.html',
  styles: [],
})
export class ProjectEditComponent implements OnInit {
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
    status: new FormControl('', [Validators.required]),
  });

  customers: Customer[] = [];
  currentProject: Project;

  constructor(
    private projectsService: ProjectService,
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private router: Router,
    private ui: UiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.currentProject = this.route.snapshot.data.project;
    this.customersService
      .findAll()
      .subscribe((data) => (this.customers = data));

    const customersUrl = [];
    this.currentProject.customer.forEach((element) => {
      customersUrl.push(`/api/customers/${element.id}`);
    });

    this.currentProject = {
      ...this.currentProject,
      customer: customersUrl,
    };

    this.form.patchValue(this.currentProject);
  }

  handleSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let editedProject = { ...this.currentProject, ...this.form.value };

    this.projectsService.update(editedProject).subscribe(
      (project) => {
        this.toastr.success('Le projet a bien été modifié');
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
