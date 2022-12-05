const NameErrorMessage = {
  required: $localize`Username is required`,
  minlength: $localize`Username must be at least 2 symbols`,
  maxlength: $localize`Username is too long. Please, use no more than 20 symbols`,
  pattern: $localize`Please, use letters or numbers, or symbols '-_.' for your username.
            The first character must be a letter`,
};

const LoginErrorMessage = {
  required: $localize`Login is required`,
  minlength: $localize`Login must be at least 2 symbols`,
  maxlength: $localize`Login is too long. Please, use no more than 20 symbols`,
  pattern: $localize`Please, use letters or numbers, or symbols '-_.' for your login.
            The first character must be a letter`,
};

const PasswordErrorMessage = {
  required: $localize`Password is required`,
  minlength: $localize`Password must be at least 8 symbols`,
  maxlength: $localize`Password is too long. Please, use no more than 20 symbols`,
  pattern: $localize`Password must include:
            - at least one upper case Latin letter,
            - at least one lower case Latin letter,
            - at least one digit,
            - at least one special character ?=.*[#?!@$%^&*-]`,
};

const ConfirmPasswordErrorMessage = {
  required: $localize`Please, confirm password`,
  minlength: $localize`Password must be at least 8 symbols`,
  maxlength: $localize`Password is too long. Please, use no more than 20 symbols`,
  pattern: $localize`Password must include:
            - at least one upper case Latin letter,
            - at least one lower case Latin letter,
            - at least one digit,
            - at least one special character ?=.*[#?!@$%^&*-]`,
  matchPassword: $localize`Password and Confirm password fields must match`,
};

const TitleErrorMessage = {
  required: $localize`Title is required`,
  minlength: $localize`Title must be at least 2 symbols`,
  maxlength: $localize`Title is too long. Please, use no more than 20 symbols`,
};

const DescriptionErrorMessage = {
  required: $localize`Description is required`,
  minlength: $localize`Description must be at least 2 symbols`,
  maxlength: $localize`Description is too long. Please, use no more than 50 symbols`,
};

export const FormControlsErrorsMessageMap = {
  name: NameErrorMessage,
  login: LoginErrorMessage,
  password: PasswordErrorMessage,
  confirmPassword: ConfirmPasswordErrorMessage,
  title: TitleErrorMessage,
  description: DescriptionErrorMessage,
};
