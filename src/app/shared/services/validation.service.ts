import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormControlsErrorsMessageMap } from '../constants/validation.constants';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  static getFormControlErrors(form: AbstractControl, formControlName: string) {
    if (!form.get(formControlName)?.errors) return [];
    const validationErrors = form.get(formControlName)?.errors as ValidationErrors;
    const errorsArray = Object.keys(validationErrors);
    const errorMessageType =
      FormControlsErrorsMessageMap[formControlName as keyof typeof FormControlsErrorsMessageMap];
    const errorMessages = errorsArray?.map(
      (error) => errorMessageType[error as keyof typeof errorMessageType],
    );
    return errorMessages;
  }

  static matchPassword(control: AbstractControl): ValidationErrors | null {
    let password = control.get('password')?.value;
    let confirmPassword = control.get('confirmPassword')?.value;
    if (password != confirmPassword) {
      control.get('confirmPassword')?.setErrors({
        matchPassword: true,
      });
    } else {
      return null;
    }
    return null;
  }
}
