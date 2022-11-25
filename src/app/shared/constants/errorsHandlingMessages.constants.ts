const AuthErrorMessage = {
  400: $localize`Something wrong with your request. Please try again later`,
  401: $localize`Incorrect login/password combination. Please try again`,
  409: $localize`Login already exist`,
  default: `Whoops, looks like something went wrong. Please try again later`,
};

const BoardErrorMessage = {
  400: $localize`Something wrong with your request. Please try again later`,
  404: $localize`Board(s) not found`,
  default: $localize`Whoops, looks like something went wrong. Please try again later`,
};

const ColumnErrorMessage = {
  400: $localize`Something wrong with your request. Please try again later`,
  404: $localize`Column(s) not found`,
  default: $localize`Whoops, looks like something went wrong. Please try again later`,
};

const TaskErrorMessage = {
  400: $localize`Something wrong with your request. Please try again later`,
  404: $localize`Task(s) not found`,
  default: $localize`Whoops, looks like something went wrong. Please try again later`,
};

const UserErrorMessage = {
  400: $localize`Something wrong with your request. Please try again later`,
  404: $localize`User(s) not found`,
  409: $localize`Login already exist`,
  default: $localize`Whoops, looks like something went wrong. Please try again later`,
};

export const ErrorsHandlingMessagesMap = {
  auth: AuthErrorMessage,
  user: UserErrorMessage,
  board: BoardErrorMessage,
  column: ColumnErrorMessage,
  task: TaskErrorMessage,
};
