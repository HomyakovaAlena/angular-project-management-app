const NameErrorMessage = {
  required: 'Username is required',
  minlength: 'Username must be at least 2 symbols',
  maxlength: 'Username is too long. Please, use no more than 20 symbols',
  pattern: `Please, use letters or numbers, or symbols '-_.' for your username.
            The first character must be a letter`,
};

const LoginErrorMessage = {
  required: 'Login is required',
  minlength: 'Login must be at least 2 symbols',
  maxlength: 'Login is too long. Please, use no more than 20 symbols',
  pattern: `Please, use letters or numbers, or symbols '-_.' for your login.
            The first character must be a letter`,
};

const PasswordErrorMessage = {
  required: 'Password is required',
  minlength: 'Password must be at least 8 symbols',
  maxlength: 'Password is too long. Please, use no more than 20 symbols',
  pattern: `Password must include:
            - at least one upper case Latin letter,
            - at least one lower case Latin letter,
            - at least one digit,
            - at least one special character ?=.*[#?!@$%^&*-]`,
};

const ConfirmPasswordErrorMessage = {
  required: 'Please, confirm password',
  minlength: 'Password must be at least 8 symbols',
  maxlength: 'Password is too long. Please, use no more than 20 symbols',
  pattern: `Password must include:
            - at least one upper case Latin letter,
            - at least one lower case Latin letter,
            - at least one digit,
            - at least one special character ?=.*[#?!@$%^&*-]`,
  matchPassword: 'Password and Confirm password fields must match',
};

const TitleErrorMessage = {
  required: 'Title is required',
  minlength: 'Title must be at least 2 symbols',
  maxlength: 'Title is too long. Please, use no more than 20 symbols',
};

const DescriptionErrorMessage = {
  required: 'Description is required',
  minlength: 'Description must be at least 2 symbols',
  maxlength: 'Description is too long. Please, use no more than 50 symbols',
};

export const FormControlsErrorsMessageMap = {
  name: NameErrorMessage,
  login: LoginErrorMessage,
  password: PasswordErrorMessage,
  confirmPassword: ConfirmPasswordErrorMessage,
  title: TitleErrorMessage,
  description: DescriptionErrorMessage,
};
