import React from 'react';
import {ListPage as QuizzesListPage, CreatePage as QuizzesCreatePage} from './Quizzes';
import {ListPage as UsersListPage, DetailPage as UsersDetailPage} from './Users';
import {ListPage as QuestionsListPage, CreatePage as QuestionsCreatePage } from './Questions';


const Admin = () => (
    <p>Admin</p>
)


export default Admin;

export {QuestionsListPage, QuestionsCreatePage, QuizzesListPage, QuizzesCreatePage, UsersListPage, UsersDetailPage};