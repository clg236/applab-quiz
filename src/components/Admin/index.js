import React from 'react';
import QuestionsListPage from './QuestionsListPage';
import QuestionsCreatePage from './QuestionsCreatePage';
import {ListPage as QuizzesListPage, CreatePage as QuizzesCreatePage} from './Quizzes';
import {ListPage as UsersListPage, DetailPage as UsersDetailPage} from './Users';


const Admin = () => (
    <p>Admin</p>
)


export default Admin;

export {QuestionsListPage, QuestionsCreatePage, QuizzesListPage, QuizzesCreatePage, UsersListPage, UsersDetailPage};