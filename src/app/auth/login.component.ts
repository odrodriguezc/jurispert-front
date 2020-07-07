import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UiService } from '../ui/ui.service';
import { ToastrService } from 'ngx-toastr';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-login',
  template: `
    <div class="pt-5 text-center w-75 m-auto">
      <h1 class="mb-3">Connexion à JuriSpert</h1>
      <div class="alert alert-danger" *ngIf="error">
        <p>
          Le compte utilisateur n'existe pas ou les données fournies ne
          correspondent pas
        </p>
      </div>
      <form [formGroup]="form" (ngSubmit)="handleSubmit()" class="w-75 m-auto">
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            [class.is-invalid]="submitted && form.controls['username'].invalid"
            placeholder="Adreese de connexion"
            formControlName="username"
          />
          <p
            class="invalid-feedback"
            *ngIf="submitted && form.controls['username'].hasError('required')"
          >
            L'email est obligatoire
          </p>
          <p
            class="invalid-feedback"
            *ngIf="submitted && form.controls['username'].hasError('email')"
          >
            Le format de l'adresse mail n'est pas valide
          </p>
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            [class.is-invalid]="submitted && form.controls['password'].invalid"
            placeholder="Mot de passe"
            formControlName="password"
          />
          <p
            class="invalid-feedback"
            *ngIf="submitted && form.controls['password'].hasError('required')"
          >
            Le mot de passe est obligatoire
          </p>
        </div>
        <button class="btn btn-success">Connexion</button>
      </form>
    </div>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  submitted: boolean = false;
  error: boolean = false;

  @Output()
  logged = new EventEmitter();

  constructor(
    private auth: AuthService,
    private router: Router,
    private ui: UiService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  handleSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this.auth.authenticate(this.form.value).subscribe(
      (data) => {
        this.ui.setLoading(false);
        this.error = false;
        this.logged.emit(data);
        this.toastr.info("Bienvenu dans l'application");
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.ui.setLoading(false);
        this.error = true;
      }
    );
  }
}
