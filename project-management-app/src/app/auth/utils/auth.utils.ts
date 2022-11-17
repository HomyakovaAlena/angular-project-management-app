import { AbstractControl, ValidationErrors } from '@angular/forms';

export interface TokenPayload {
  exp: number;
  iat: number;
  id: string;
  login: string;
}

export const parseJwt = (token: string): TokenPayload => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
  return JSON.parse(jsonPayload);
};

export const isTokenExpired = (token: string): boolean => Date.now() >= parseJwt(token).exp * 1000;

// export const NameErrorMessage = {
//   required: 'Username is required',
//   minlength: 'Username must be at least 2 symbols',
//   maxlength: 'Username is too long. Please, use no more than 20 symbols',
//   pattern: `Please, use letters or numbers, or symbols '-_.' for your username.
//             The first character must be a letter`,
// };

// export const LoginErrorMessage = {
//   required: 'Login is required',
//   minlength: 'Login must be at least 2 symbols',
//   maxlength: 'Login is too long. Please, use no more than 20 symbols',
//   pattern: `Please, use letters or numbers, or symbols '-_.' for your login.
//             The first character must be a letter`,
// };

// export const PasswordErrorMessage = {
//   required: 'Password is required',
//   minlength: 'Password must be at least 8 symbols',
//   maxlength: 'Password is too long. Please, use no more than 20 symbols',
//   pattern: `Password must include:
//             - at least one upper case Latin letter,
//             - at least one lower case Latin letter,
//             - at least one digit,
//             - at least one special character ?=.*[#?!@$%^&*-]`,
// };

// export const ConfirmPasswordErrorMessage = {
//   required: 'Please, confirm password',
//   minlength: 'Password must be at least 8 symbols',
//   maxlength: 'Password is too long. Please, use no more than 20 symbols',
//   pattern: `Password must include:
//             - at least one upper case Latin letter,
//             - at least one lower case Latin letter,
//             - at least one digit,
//             - at least one special character ?=.*[#?!@$%^&*-]`,
//   matchPassword: 'Password and Confirm password fields must match',
// };

// export const FormControlsErrorsMessageMap = {
//   name: NameErrorMessage,
//   login: LoginErrorMessage,
//   password: PasswordErrorMessage,
//   confirmPassword: ConfirmPasswordErrorMessage,
// };

// export function getFormControlErrors(form: AbstractControl, formControlName: string) {
//   if (!form.get(formControlName)?.errors) return;
//   const validationErrors = form.get(formControlName)?.errors as ValidationErrors;
//   const errors = Object.keys(validationErrors);
//   console.log(errors);
//   const typeOfErrorsMessage =
//     FormControlsErrorsMessageMap[formControlName as keyof typeof FormControlsErrorsMessageMap];
//   const formControlErrorsArray = errors?.map(
//     (error) => typeOfErrorsMessage[error as keyof typeof NameErrorMessage],
//   );
//   return formControlErrorsArray;
// }

// export function matchPassword(control: AbstractControl): ValidationErrors | null {
//   let password = control.get('password')?.value;
//   let confirmPassword = control.get('confirmPassword')?.value;
//   if (password != confirmPassword) {
//     control.get('confirmPassword')?.setErrors({
//       matchPassword: true,
//     });
//   } else {
//     return null;
//   }
//   return null;
// }
