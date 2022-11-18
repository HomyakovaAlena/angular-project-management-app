const AuthErrorMessage = {
  400: 'Something wrong with your request. Please try again later',
  401: 'Incorrect login/password combination. Please try again',
  409: `Login already exist`,
  default: 'Whoops, looks like something went wrong. Please try again later',
};

const BoardErrorMessage = {
  400: 'Something wrong with your request. Please try again later',
  404: 'Board(s) not found',
  default: 'Whoops, looks like something went wrong. Please try again later',
};

const ColumnErrorMessage = {
  400: 'Something wrong with your request. Please try again later',
  404: 'Column(s) not found',
  default: 'Whoops, looks like something went wrong. Please try again later',
};

const TaskErrorMessage = {
  400: 'Something wrong with your request. Please try again later',
  404: 'Task(s) not found',
  default: 'Whoops, looks like something went wrong. Please try again later',
};

const UserErrorMessage = {
  400: 'Something wrong with your request. Please try again later',
  404: 'User(s) not found',
  409: `Login already exist`,
  default: 'Whoops, looks like something went wrong. Please try again later',
};

export const ErrorsHandlingMessagesMap = {
  auth: AuthErrorMessage,
  user: UserErrorMessage,
  board: BoardErrorMessage,
  column: ColumnErrorMessage,
  task: TaskErrorMessage,
};
