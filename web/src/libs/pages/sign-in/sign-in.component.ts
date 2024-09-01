import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ILoginForm } from './sign-form';
import {
  EMAIL_REG_EXP,
  PASSWORD_REG_EXP,
} from 'src/libs/cores/constants/regex.constant';
import { AuthFacade } from 'src/libs/cores/services/auth';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  form!: FormGroup<ILoginForm>;
  constructor(private authFacade: AuthFacade, private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }
  private createForm() {
    this.form = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(EMAIL_REG_EXP)],
        updateOn: 'change',
      }),

      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(PASSWORD_REG_EXP)],
        updateOn: 'change',
      }),
    });
  }

  onSubmit() {
    this.authFacade
      .login(this.form.value)
      .pipe(
        tap(() => {
          this.form.reset();
          this.router.navigate(['/']);
        }),
        catchError((err) => {
          return of(err);
        })
      )
      .subscribe();
  }
}
