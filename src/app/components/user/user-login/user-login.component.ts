import { Component, OnDestroy } from '@angular/core';
import { FormData } from 'src/app/models/form-data';
import { Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
})
export class UserLoginComponent implements OnDestroy {
  private loginUserForm: FormGroup;
  private loginSubscription: Subscription;
  formData: FormData = {
    fields: [
      {
        name: 'username',
        type: 'text',
        label: 'Nombre de Usuario:',
        value: '',
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
      },
      {
        name: 'password',
        type: 'password',
        label: 'Contraseña:',
        value: '',
        validators: [Validators.required, Validators.minLength(7), Validators.maxLength(20)]
      }
    ],
    buttons: [
      { value: 'Iniciar Sesión', style: 'info', action: this.onSubmit.bind(this) }
    ],
    errorList: {
      'USERNAME_INVALID': 'El nombre de usuario es inválido. (Mínimo 4 - Máximo 20 caracteres)',
      'PASSWORD_INVALID': 'La contraseña es inválida. (Mínimo 7 - Máximo 20 caracteres)',
      'USER_PASSWORD_ARE_WRONG': 'El usuario o la contraseña son erroneas',
      'REQUEST_ERROR': 'Hubo un error al autenticar su usuario. Inténtelo más tarde'
    }
  };
  private submitLoading: boolean = false;
  private errorId: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (!this.submitLoading && this.isFormValid()) {
      this.submitLoading = true;
      const user: User = { username: this.username, password: this.password };
      this.loginSubscription = this.userService.authenticate(user)
        .subscribe(
          () => {
            this.router.navigate(['/']);
            this.submitLoading = false;
          },
          (statusCode) => {
            this.errorId = statusCode === 0 ? 'REQUEST_ERROR' : 'USER_PASSWORD_ARE_WRONG';
            this.submitLoading = false;
          }
        );
    }
  }

  isFormValid(): boolean {
    let isValid: boolean = false;
    if (this.loginUserForm.valid) {
      isValid = true;
      this.errorId = undefined;
    } else {
      if (!this.loginUserForm.get('username').valid) {
        this.errorId = 'USERNAME_INVALID';
      } else {
        this.errorId = 'PASSWORD_INVALID';
      }
      this.submitLoading = false;
    }
    return isValid;
  }

  setLoginUserForm(loginUserForm: FormGroup) {
    this.loginUserForm = loginUserForm;
  }

  get username(): string {
    return this.loginUserForm.get('username').value;
  }

  get password(): string {
    return this.loginUserForm.get('password').value;
  }
}
