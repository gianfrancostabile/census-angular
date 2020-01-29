import { Component, OnDestroy } from '@angular/core';
import { FormData } from 'src/app/models/form-data';
import { Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
})
export class UserRegisterComponent implements OnDestroy {
  private registerUserForm: FormGroup;
  private registerSubscription: Subscription;
  formData: FormData = {
    fields: [
      {
        name: 'username',
        type: 'text',
        label: 'Nombre de Usuario:',
        validators: [Validators.required, Validators.minLength(4), Validators.maxLength(20)]
      },
      {
        name: 'password',
        type: 'password',
        label: 'Contraseña:',
        validators: [Validators.required, Validators.minLength(7), Validators.maxLength(20)]
      },
      {
        name: 'confirmPassword',
        type: 'password',
        label: 'Confirmar contraseña:',
        validators: [Validators.required, Validators.minLength(7), Validators.maxLength(20)]
      }
    ],
    buttons: [
      { value: 'Registrarse', style: 'info', action: this.onSubmit.bind(this) }
    ],
    errorList: {
      'USERNAME_INVALID': 'El nombre de usuario es inválido. (Mínimo 4 - Máximo 20 caracteres)',
      'PASSWORD_INVALID': 'La contraseña es inválida. (Mínimo 7 - Máximo 20 caracteres)',
      'CONFIRMATION_PASSWORD_INVALID': 'La contraseña de confirmación es inválida. (Mínimo 7 - Máximo 20 caracteres)',
      'PASSWORDS_DO_NOT_MATCH': 'Las contraseñas no coinciden',
      'USERNAME_ALREADY_EXISTS': 'El usuario que intenta registrar ya existe',
      'REQUEST_ERROR': 'Hubo un error al registrar su usuario. Inténtelo más tarde'
    }
  };
  private submitLoading: boolean = false
  private errorId: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnDestroy() {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (!this.submitLoading && this.isFormValid()) {
      this.submitLoading = true
      if (this.password === this.confirmPassword) {
        const user: User = { username: this.username, password: this.password };
        this.registerSubscription = this.userService.register(user)
          .subscribe(
            () => {
              this.router.navigate(['/login']);
              this.submitLoading = false;
            },
            (statusCode) => {
              this.errorId = statusCode === 0 ? 'REQUEST_ERROR' : 'USERNAME_ALREADY_EXISTS';
              this.submitLoading = false;
            },
          );
      } else {
        this.errorId = 'PASSWORDS_DO_NOT_MATCH';
        this.submitLoading = false;
      }
    }
  }

  isFormValid(): boolean {
    let isValid: boolean = false;
    if (this.registerUserForm.valid) {
      isValid = true;
      this.errorId = undefined;
    } else {
      if (!this.registerUserForm.get('username').valid) {
        this.errorId = 'USERNAME_INVALID';
      } else if (!this.registerUserForm.get('password').valid) {
        this.errorId = 'PASSWORD_INVALID';
      } else {
        this.errorId = 'CONFIRMATION_PASSWORD_INVALID';
      }
      this.submitLoading = false;
    }
    return isValid;
  }

  setRegisterUserForm(registerUserForm: FormGroup) {
    this.registerUserForm = registerUserForm;
  }

  get username(): string {
    return this.registerUserForm.get('username').value;
  }

  get password(): string {
    return this.registerUserForm.get('password').value;
  }

  get confirmPassword(): string {
    return this.registerUserForm.get('confirmPassword').value;
  }
}
