//our application routes
export const LANDING = '/';
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const HOME = '/home';
export const ACCOUNT = '/account';
export const ADMIN = '/admin';
export const PASSWORD_FORGET = 'pw-forget';

export const LIST_QUIZZES = '/quizzes';
export const CREATE_QUIZ = '/quizzes/create';
export const VIEW_QUIZ = '/quizzes/:id';
export const Edit_QUIZ = '/quizzes/:id/edit';
export const VIEW_QUIZ_SUBMISSION = '/quizzes/:quizID/submissions/:submissionID';

export const LIST_ASSIGNMENTS = '/assignments';
export const CREATE_ASSIGNMENT = '/assignments/create';
export const VIEW_ASSIGNMENT = '/assignments/:id';
export const Edit_ASSIGNMENT = '/assignments/:id/edit';
export const VIEW_ASSIGNMENT_SUBMISSION = '/assignments/:quizID/submissions/:submissionID';

export const VIEW_USER = '/users/:id';

export const ADMIN_LIST_QUIZZES = '/admin/quizzes';
export const ADMIN_LIST_ASSIGNMENTS = '/admin/assignments';

export const ADMIN_USERS = '/admin/users';
