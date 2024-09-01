import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IRegisterForm } from './register.form';
import {
  EMAIL_REG_EXP,
  PASSWORD_REG_EXP,
  USER_REG_EXP,
} from 'src/libs/cores/constants/regex.constant';
import { AuthFacade } from 'src/libs/cores/services/auth';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup<IRegisterForm>;
  isError = false;
  constructor(private authFacade: AuthFacade, private router: Router) {}

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = new FormGroup({
      username: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(USER_REG_EXP)],
        updateOn: 'change',
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(EMAIL_REG_EXP)],
        updateOn: 'change',
      }),
      firstName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
      lastName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(PASSWORD_REG_EXP)],
        updateOn: 'change',
      }),
    });
    this.form.valueChanges.subscribe(() => {
      this.isError = false;
    });
  }
  onSubmit() {
    this.authFacade
      .register(this.form.value)
      .pipe(
        tap((res: any) => {
          if (res.success) this.router.navigate(['/sign-in']);
          else {
            console.log(res);
            this.isError = true;
          }
        }),
        catchError((err) => {
          this.isError = true;
          return of();
        })
      )
      .subscribe();
  }
}
