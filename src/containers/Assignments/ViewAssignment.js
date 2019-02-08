import React from 'react';
import ViewQuiz from "../Quizzes/ViewQuiz";

const ViewAssignment = props => (
    <ViewQuiz {...props} type="assignment" />
);

export default ViewAssignment;